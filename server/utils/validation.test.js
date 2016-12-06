const expect = require('expect');

const {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var str = true;
        var isStr = isRealString(str);
        expect(isStr).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var str = '    ';
        var isStr = isRealString(str);
        expect(isStr).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        var str = '  Hey   ';
        var isStr = isRealString(str);
        expect(isStr).toBe(true);
    });
});