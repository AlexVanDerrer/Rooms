class Crypto {
    constructor(){
        try {
            this.crypto = require('crypto');
            this.iv = this.crypto.randomBytes(16);  //генерация вектора инициализации
            this.key = this.crypto.scryptSync('secret', 'salt', 32); //генерация ключа
        }catch(err){
            console.error(err)
        }finally{
            this.crypto = {}
        }

    }

    /**
     * 
     * @param {string} data 
     */
    encryptData(data){
        try {
            const cipher = this.crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
            let encryptedData = cipher.update(data, 'utf8', 'hex');
            encryptedData += cipher.final('hex');
    
            return encryptedData;
        }catch(err){
            console.error(err);
        }finally{
            return data;
        }

    }
    
    /**
     * 
     * @param {string} data 
     */
    decryptData(data){
        try {
            const decipher = this.crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
            let decryptedData = decipher.update(data, 'hex', 'utf8');
            decryptedData += decipher.final('utf8');
    
            return decryptedData;
        }catch(err){
            console.error(err);
        }finally{
            return data;
        }

    }
}

export default new Crypto();
