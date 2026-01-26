import cron from 'node-cron';
import https from 'https';

const PROJECT_URLS = [
    'https://portfolio-backend-cqtm.onrender.com/', // Main Backend (Self-Ping)
    'https://fp-hna2.onrender.com/', // Fitness Pro
    'https://simple-ecommerce-backend-three.vercel.app/products', // E-Commerce
    'https://luxchat-kappa.vercel.app', // LuxChat
    'https://restaurant-saas-website.netlify.app/' // Restaurant SaaS
];

export const startKeepAliveService = () => {
    // Run every 14 minutes (Render sleeps after 15 mins inactive)
    cron.schedule('*/14 * * * *', () => {
        console.log(`[${new Date().toISOString()}] 🔄 Keeping projects alive...`);

        PROJECT_URLS.forEach(url => {
            https.get(url, (res) => {
                // Just reading status is enough to wake it up
                console.log(`✅ Pinged ${url} - Status: ${res.statusCode}`);
            }).on('error', (e) => {
                console.error(`❌ Failed to ping ${url}: ${e.message}`);
            });
        });
    });

    console.log('🚀 Keep-Alive Service Started: Pinging projects every 14 mins.');
};
