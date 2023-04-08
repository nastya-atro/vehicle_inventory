import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import * as path from "path";
import * as hogan from "hogan.js";
import * as fs from "fs";
import {
  EmailTemplates,
  TemplateType,
} from "../../common/constants/email-templates";

interface EmailOptions {
  from?: string;
  to?: string;
  subject: string;
  text?: string;
  html?: string;
}

const templateDir = path.join(__dirname, "../../../public/templates");

@Injectable()
export class TransportService {
  transport: Transporter;

  constructor() {
    if (!this.transport) {
      this.transport = nodemailer.createTransport({
        host: process.env.SEND_MAIL_SMTP_HOST,
        port: +process.env.SEND_MAIL_SMTP_PORT,
        secure: process.env.SEND_MAIL_SMTP_SSL === "true",
        auth: {
          user: process.env.SEND_MAIL_USER,
          pass: process.env.SEND_MAIL_PASSWORD,
        },
      });
    }
  }

  async send(type: TemplateType, options: EmailOptions, data) {
    try {
      if (data == null) {
        throw new Error(`No data, you made Transport sad :'(`);
      }

      const templateName = EmailTemplates[type];

      const fullPath = templateDir + "/" + templateName + ".template.html";

      if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
        try {
          options.html = fs.readFileSync(fullPath, "utf8");
        } catch (err) {
          throw new Error(
            `Cannot get email template with name "${templateName}"`
          );
        }
      }

      const templateHTML = hogan.compile(options.html || "");
      options.html = templateHTML.render(data);

      const templateText = hogan.compile(options.text || "");
      options.text = templateText.render(data);

      const info = await this.transport.sendMail(options);
      // TODO: WILL USE LOGGER!

      return { messageId: info.messageId };
    } catch (e) {
      throw e;
    }
  }
}
