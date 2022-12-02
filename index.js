/*eslint no-undef: 0*/
let internalCDN;

module.exports = class faceio {
    constructor(appID){
        if(internalCDN) return;

        let script = document.createElement('script')

        script.setAttribute('src', 'https://cdn.faceio.net/fio.js');

        document.head.appendChild(script);

        script.addEventListener('load', () => {
            internalCDN = new faceIO(appID)
        })
    }
    /**
     * Enroll new user.
     * @param  {Object}   parameters                    enroll() takes a single, optional parameters object with the properties to be configured.
     * @param  {Object}   parameters.payload            An arbitrary set of data, you want to associate with the user being enrolled.
     * @param  {Number}   parameters.permissionTimeout  Total number of seconds to wait for the user to grant camera access permission.
     * @param  {Number}   parameters.termsTimeout       Total number of minutes to wait for the user to accept FACEIO/Host Application Terms of Service.
     * @param  {Number}   parameters.idleTimeout        Total number of seconds to wait before giving up if no faces were detected during the enrollment process.
     * @param  {Number}   parameters.replyTimeout       Total number of seconds to wait before giving up if the remote FACEIO processing node does not return a response (a very unlikely scenario).
     * @param  {Number}   parameters.enrollIntroTimeout Enrollment Widget introduction/instruction screen display delay.
     * @param  {String}   parameters.locale             Default interaction language for the Widget display.
     * @param  {Boolean}  parameters.userConsent        If you have already collected user consent before enrollment (eg. When the user create a new account on your Website and accept the terms), you can set this parameter to true.
     * @returns {String}                                facialId: A Universally Unique Identifier assigned to this particular user.
     * @returns {String}                                timestamp: ISO 8601, enrollment completion date & time.
     * @returns {Object}                                details: 	An object with two fields: gender and age which respectively corresponds to the Gender and Age approximation of the enrolled user.
     * @example
     * faceio.enroll({
     *   "locale": "auto", // Default user locale
     *   "payload": {
     *     "whoami": 123456, // Dummy ID linked to this particular user
     *     "email": "john.doe@example.com"
     *   }
     * });
     */
    async enroll(parameters) {
        return await internalCDN.enroll(parameters)
    }

    /**
     * Transactionally authenticate previously enrolled users.
     * @param {Object} parameters                   authenticate() takes a single, optional parameters object with the properties to be configured.
     * @param {Number} parameters.permissionTimeout Total number of seconds to wait for the user to grant camera access permission.
     * @param {Number} parameters.idleTimeout       Total number of seconds to wait before giving up if no faces were detected during the authentication process.
     * @param {Number} parameters.replyTimeout      Total number of seconds to wait before giving up if the remote FACEIO processing node does not return a response (a very unlikely scenario)
     * @param {String} parameters.locale            Default interaction language of the FACEIO Widget.
     * @returns {any}                               payload: The arbitrary data you have already linked (if any) to this particular user during his enrollment via the payload parameter of the enroll() method.
     * @returns {String}                            facialId: A Universally Unique Identifier assigned to this particular user.
     * @example
     * faceio.authenticate({
     *   "locale": "auto" // Default user locale
     * });
     */
    async authenticate(parameters) {
        return await internalCDN.authenticate(parameters)
    }

    /**
     * Purge the current session and request a new one.
     * @returns true if the request for a new session have been granted, and ready for another round of calls to enroll() or authenticate() for the same user. false otherwise.
     */

    async restartSession() {
        return await internalCDN.restartSession()
    }
}