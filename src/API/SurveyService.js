import db from './FirebaseConfig';

const SurveyData = db.collection('SurveyData');

export default class SurveyService {
    static async create(questions) {
        try {
            const surveyData = { data: [questions] };

            await SurveyData.doc('survey').set(surveyData);

            console.log(`Survey created at ${new Date().toLocaleTimeString('uk-UA')}`);
        } catch (error) {
            console.error('Error creating survey', error);
            throw error;
        }
    }

    static async add(answers) {
        try {
            const surveyRef = SurveyData.doc('survey');
            const surveyDoc = await surveyRef.get();

            if (surveyDoc.exists) {
                const surveyData = surveyDoc.data();
                surveyData.data.push(answers);
                await surveyRef.set(surveyData);

                console.log(`Answers added at ${new Date().toLocaleTimeString('uk-UA')}`);
            } else {
                throw new Error('Survey document not found');
            }
        } catch (error) {
            console.error('Error adding answers to survey', error);
            throw error;
        }
    }

    static async get() {
        try {
            const surveyDoc = await SurveyData.doc('survey').get();

            if (surveyDoc.exists) {
                const surveyData = surveyDoc.data();

                console.log(`Survey data retrieved at ${new Date().toLocaleTimeString('uk-UA')}`);

                return surveyData.data;
            } else {
                throw new Error('Survey document not found');
            }
        } catch (error) {
            console.error('Error getting survey data', error);
            throw error;
        }
    }
}
