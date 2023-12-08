export function hexToBinary32Bit(hexStr, oldHex) {
    let binaryRepresentation = (parseInt("0x" + hexStr, 16)).toString(2);
    if (checkFirstByte(oldHex)) {
        binaryRepresentation = twosComplement(binaryRepresentation);
    }
    return binaryRepresentation.padStart(32, '0');
}

export function binaryToDecimal(binaryStr, hexStr) {
    if (checkFirstByte(hexStr)) {
        return (parseInt(binaryStr, 2) + 1) * -1;
    }
    return parseInt(binaryStr, 2);
}

export function twosComplement(binaryStr) {
    const inverted = binaryStr.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
    return (parseInt(inverted, 2) + 1).toString(2);
}

export function checkFirstByte(hexStr) {
    return hexStr.slice(6, 8) === 'ff';
}

export  function hexToDecimalLittleEndian(hexValue) {
    return binaryToDecimal(hexToBinary32Bit(littleEndian(hexValue), hexValue), hexValue) / 1000.00;
}

export function littleEndian(hexValue) {
    let hexNew = '';
    for (let i = 0; i < hexValue.length; i += 2) {
        hexNew = hexNew + hexValue.slice(hexValue.length - i - 2, hexValue.length - i) ;
    }
    return hexNew;
}

export function decimalToBinary32Bit(decimal) {
    const binaryStr = (decimal < 0) ? (decimal * -1 - 2).toString(2) : decimal.toString(2);
    return binaryStr.padStart(32, (decimal < 0) ? '1' : '0');
}

export function decimalToHexLittleEndian(decimal) {
    const binaryValue = decimalToBinary32Bit(decimal);
    const hexValue = parseInt(binaryValue, 2).toString(16).padStart(8, '0');
    return littleEndian(hexValue);
}

export function hexToListInt(hexStr) {
    return Array.from({ length: hexStr.length / 2 }, (_, i) => parseInt(hexStr.slice(i * 2, (i + 1) * 2), 16));
}

export function updateRateValue(hexValue) {
    return binaryToDecimal(hexToBinary32Bit(littleEndian(hexValue)), hexValue);
}

export function binaryToHex(binaryStr) {
    const decimalValue = parseInt(binaryStr, 2);
    const hexValue = decimalValue.toString(16);
    return hexValue;
}

