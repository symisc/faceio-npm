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

    restartSession() {
        return internalCDN.restartSession()
    }
    
    /**
    * Return the list of all possible error codes than can be triggered during failed authentication or enrollment.
    * @returns fioErrorCode object
    */
    fetchAllErrorCodes(){
     return {
        PERMISSION_REFUSED: 1, /* Access to the Camera stream was denied by the end user */
        NO_FACES_DETECTED:  2, /* No faces were detected during the enroll or authentication process */
        UNRECOGNIZED_FACE:  3, /* Unrecognized face on this application's Facial Index */
        MANY_FACES:         4, /* Two or more faces were detected during the scan process */
        PAD_ATTACK:         5, /* Presentation (Spoof) Attack (PAD) detected during the scan process */
        FACE_MISMATCH:      6, /* Calculated Facial Vectors of the user being enrolled do not matches */
        NETWORK_IO:         7, /* Error while establishing network connection with the target FACEIO processing node */
        WRONG_PIN_CODE:     8, /* Wrong PIN code supplied by the user being authenticated */
        PROCESSING_ERR:     9, /* Server side error */
        UNAUTHORIZED:       10, /* Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information */
        TERMS_NOT_ACCEPTED: 11, /* Terms & Conditions set out by FACEIO/host application rejected by the end user */
        UI_NOT_READY:       12, /* The FACEIO Widget code could not be (or is being) injected onto the client DOM */
        SESSION_EXPIRED:    13, /* Client session expired. The first promise was already fulfilled but the host application failed to act accordingly */
        TIMEOUT:            14, /* Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.) */
        TOO_MANY_REQUESTS:  15, /* Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications */
        EMPTY_ORIGIN:       16, /* Origin or Referer HTTP request header is empty or missing */
        FORBIDDDEN_ORIGIN:  17, /* Domain origin is forbidden from instantiating fio.js */
        FORBIDDDEN_COUNTRY: 18, /* Country ISO-3166-1 Code is forbidden from instantiating fio.js */
        UNIQUE_PIN_REQUIRED: 19, /* Supplied PIN Code must be unique among other PIN's on this application */
        SESSION_IN_PROGRESS: 20, /* Another authentication or enrollment session is in progress */
        FACE_DUPLICATION:    21, /* Prevent face duplication during enrollment. Same user trying to enroll twice or more */
        MINORS_NOT_ALLOWED:  22  /* Minors not allowed to enroll on this application */ 
    };   
   }
}
