import emailjs from 'emailjs-com';
import EmailService from '../API/EmailService';
import TitleService from '../API/TitleService';

const sendEmail = async (answers) => {
    const emailAddress = await EmailService.get();
    const title = await TitleService.get();
    const serviceInfo = await EmailService.getServiceInfo();

    if (emailAddress) {
        const templateParams = {
            subject: `Стосовно опитування: "${title}"`,
            to_email: `${emailAddress}`,
            message: `${answers[0]} о ${answers[1]} користувач ${answers[3]} (${answers[2]}) успішно пройшов опитування "${title}".`,
        };

        emailjs.init(`${serviceInfo.init}`);

        emailjs.send(`${serviceInfo.service}`, `${serviceInfo.template}`, templateParams).then(
            (response) => {
                console.log(
                    `${new Date().toLocaleTimeString('uk-UA')} message sent to administrator`,
                    response.status,
                    response.text
                );
            },
            (error) => {
                console.log(`${new Date().toLocaleTimeString('uk-UA')} error sending message to administrator`, error);
            }
        );
    } else {
        console.log(`${new Date().toLocaleTimeString('uk-UA')} email address is not found in database`);
    }
};

export default sendEmail;
