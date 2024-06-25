function generateRandomCode() {
    // Function to generate a random alphabet character
    function getRandomAlphabet() {
      const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    }
  
    // Function to generate a random integer between 0 and 9
    function getRandomNumber() {
      return Math.floor(Math.random() * 10);
    }
    // Generate two random alphabet characters
    let randomChars = getRandomAlphabet() + getRandomAlphabet();
  
    // Generate five random numbers
    let randomNumbers = '';
    for (let i = 0; i < 5; i++) {
      randomNumbers += getRandomNumber();
    }
  
    return randomChars + randomNumbers;
  }
  
export default generateRandomCode;