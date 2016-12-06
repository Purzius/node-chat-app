var expect = require('expect');

var {generateMessage,
    generateLocationMessage} = require('./message.js');

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

describe('generateLocationMessage', () => {
    it('should generate corret location obect', () => {
        var lat = 9.11524321,
            lng = 56.4642131,
            from = 'User',
            myUrl = `https://www.google.com/maps?q=${lat},${lng}`;
            
        var msg = generateLocationMessage(from, lat, lng);
        expect(msg.from).toBe(from);
        expect(msg.url).toBe(myUrl);
        expect(msg.createdAt).toBeA('number');
    });
});