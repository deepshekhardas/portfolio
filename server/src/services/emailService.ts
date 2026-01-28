import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Use App Password for Gmail
        },
    });
};

// Send notification email to portfolio owner
export const sendContactNotification = async (
    senderName: string,
    senderEmail: string,
    message: string
): Promise<boolean> => {
    try {
        const transporter = createTransporter();

        const mailOptions: EmailOptions = {
            to: process.env.EMAIL_USER || 'deepshekhardas1234@gmail.com',
            subject: `🚀 New Portfolio Contact: ${senderName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border-radius: 16px;">
                    <h1 style="color: #f59e0b; text-align: center; margin-bottom: 30px;">📬 New Contact Message</h1>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h3 style="color: #a5b4fc; margin: 0 0 10px 0;">From:</h3>
                        <p style="color: white; font-size: 18px; margin: 0;">${senderName}</p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h3 style="color: #a5b4fc; margin: 0 0 10px 0;">Email:</h3>
                        <a href="mailto:${senderEmail}" style="color: #f59e0b; font-size: 18px; text-decoration: none;">${senderEmail}</a>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px;">
                        <h3 style="color: #a5b4fc; margin: 0 0 10px 0;">Message:</h3>
                        <p style="color: white; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <p style="color: #64748b; font-size: 12px;">Sent from your Portfolio Contact Form</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Notification email sent for contact from: ${senderEmail}`);
        return true;
    } catch (error) {
        console.error('❌ Failed to send notification email:', error);
        return false;
    }
};
