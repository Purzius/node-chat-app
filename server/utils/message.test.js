var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var name = 'Mads',
            text = 'Hey, whazzup?';
        
        var msg = generateMessage(name, text);
        expect(msg.from).toBe(name);
        expect(msg.text).toBe(text);
        expect(msg).toInclude({from: name, text})
        expect(msg.createdAt).toBeA('number');
    });
});