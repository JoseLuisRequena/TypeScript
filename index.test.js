const { Room, Booking, totalOccupancyPercentage, availableRooms } = require('./index')

describe('isOccupied', () => {
    describe('no bookings', () => {
        test('booking date ( with toBe("false"))', () => {
            const roomTemplate = {name: 'Ocean view suite', price: 35000, discount: 0}
            const room = new Room({...roomTemplate });
            room.bookings =[];
            expect(room.isOccupied(new Date (2022, 1, 2))).toBe(false);
        });
    });

    describe('whith bookings', () => {
        test('booking date ( with .toBe("Fred Smith"))', () => {
            const roomTemplate = {name: 'Ocean view suite', price: 35000, discount: 0}
            const room = new Room({...roomTemplate });
            const booking1 = new Booking({name: 'Fred Smith', room: room, checkIn: new Date ('2022-8-1'), checkOut: new Date ('2022-8-3')});// this booking
            const booking2 = new Booking({name: 'Smith', room: room, checkIn: new Date ('2022-8-5'), checkOut: new Date ('2022-8-6')});
            const booking3 = new Booking({name: 'Fred', room: room, checkIn: new Date ('2022-8-10'), checkOut: new Date ('2022-8-15')});
            room.bookings = [booking1, booking2, booking3];
            expect(room.isOccupied(new Date ('2022-8-2'))).toBe('Fred Smith');
        });

        test('booking date (with .toBe("false"))', () => {
            const roomTemplate = {name: 'Ocean view suite', price: 35000, discount: 0}
            const room = new Room({...roomTemplate});
            const booking1 = new Booking({name: 'Fred Smith', room: room, checkIn: new Date ('2022-8-5'), checkOut: new Date ('2022-8-8')});
            const booking2 = new Booking({name: 'Smith', room: room, checkIn: new Date ('2022-8-9'), checkOut: new Date ('2022-8-10')});
            const booking3 = new Booking({name: 'Fred', room: room, checkIn: new Date ('2022-8-11'), checkOut: new Date ('2022-8-15')});
            room.bookings =[booking1, booking2, booking3];
            expect(room.isOccupied(new Date ('2022-8-2'))).toBe(false);
        });
    });
});

describe('occupancyPercentage( startDate, endDate )', () => {
    test('without reservation - occupancy 0%', () => {
        const roomTemplate = {name: 'Ocean view suite', price: 35000, discount: 0}
        const room = new Room({...roomTemplate})
        room.bookings= [];
        expect(room.occupancyPercentage(new Date('2022-8-30'), new Date('2022-9-3'))).toBe(0);
    });

    test('with reservation - occupancy 0%', () => {
        const roomTemplate = {name: 'Ocean view suite', price: 35000, discount: 0}
        const room = new Room({...roomTemplate})
        const booking1 = new Booking({name: 'Fred Smith', room: room, checkIn: new Date('2022-8-5'), checkOut: new Date('2022-8-8')});
        room.bookings = [booking1];
        expect(room.occupancyPercentage(new Date('2022-8-9'), new Date('2022-8-13'))).toBe(0);
    });
    
    test('with reservation - occupancy 50%', () => {
        const room = new Room({name: 'Ocean view suite', price: 35000, discount: 0});
        const booking1 = new Booking({name: 'Fred Smith', room: room, checkIn: new Date('2022-8-15'), checkOut: new Date('2022-8-22')});
        room.bookings = [booking1];
        expect(room.occupancyPercentage(new Date('2022-8-10'), new Date('2022-8-20'))).toBe(50);
    });

    test('with reservation - Ocuoccupancy 10%', () => {
        const roomTemplate = {name: 'Ocean view suite', price: 35000, discount: 0}
        const room = new Room({...roomTemplate })
        const booking1 = new Booking({name: 'Fred Smith', room: room, checkIn: new Date('2022-8-15'), checkOut: new Date('2022-8-20')});
        room.bookings= [booking1];
        expect(room.occupancyPercentage(new Date('2022-8-6'), new Date('2022-8-16'))).toBe(10);
    });

    test('with reservation - occupancy 20%', () => {
        const roomTemplate = {name: 'Ocean view suite', price: 35000, discount: 0}
        const room = new Room({...roomTemplate })
        const booking1 = new Booking({name: 'Fred Smith', room: room, checkIn: new Date('2022-8-14'), checkOut: new Date('2022-8-18')});
        room.bookings= [booking1];
        expect(room.occupancyPercentage(new Date('2022-8-6'), new Date('2022-8-16'))).toBe(20);
    });

    test('with reservation - Ooccupancy 100%', () => {
        const roomTemplate = {name: 'Ocean view suite', price: 35000, discount: 0}
        const room = new Room({...roomTemplate })
        const booking1 = new Booking({name: 'Fred Smith', room: room, checkIn: new Date('2022-8-15'), checkOut: new Date('2022-8-24')});
        room.bookings= [booking1];
        expect(room.occupancyPercentage(new Date('2022-8-15'), new Date('2022-8-24'))).toBe(100);
    });
});

//------------------------------------------------------------------------------------------------------------------------------------------

describe('totalOccupancyPercentage( rooms, startDate, endDate )', () => {
    test('without reservation - occupancy 0%', () => {
        let rooms = [];
        expect(totalOccupancyPercentage(rooms, new Date('2022-8-25'), new Date('2022-8-30'))).toBe(0);
    });

    test('with four reservation - occupancy 20%', () => {
        let rooms = [];
        const room1 = new Room({name: 'Ocean view suite', price: 35000, discount: 0});
        const booking1 = new Booking({name: 'Fred Smith', room: room1, checkIn: new Date('2022-8-29'), checkOut: new Date('2022-9-8')}); //10%
        room1.bookings = [booking1];
        
        const room2 = new Room({name: 'Dual suite', price: 35000, discount: 0});
        const booking2 = new Booking({name: 'Fred Smith', room: room2, checkIn: new Date('2022-8-27'), checkOut: new Date('2022-9-6')}); //30%
        room2.bookings = [booking2];

        const room3 = new Room({name: 'Ocean view', price: 35000, discount: 0});
        const booking3 = new Booking({name: 'Fred Smith', room: room3, checkIn: new Date('2022-9-1'), checkOut: new Date('2022-9-8')}); //0%
        room3.bookings = [booking3];
        
        const room4 = new Room({name: 'Mountain view', price: 35000, discount: 0});
        const booking4 = new Booking({name: 'Fred Smith', room: room4, checkIn: new Date('2022-8-26'), checkOut: new Date('2022-9-5')}); //40%
        room4.bookings = [booking4];

        rooms = [room1, room2, room3, room4];
        expect(totalOccupancyPercentage(rooms, new Date('2022-8-20'), new Date('2022-8-30'))).toBe(20);
    });

    test('with three reservation - occupancy 30%', () => {
        let rooms = [];
        const room1 = new Room({name: 'Ocean view suite', price: 35000, discount: 0});
        const booking1 = new Booking({name: 'Fred Smith', room: room1, checkIn: new Date('2022-8-25'), checkOut: new Date('2022-9-3')}); //50%
        room1.bookings = [booking1];
        
        const room2 = new Room({name: 'Dual suite', price: 35000, discount: 0});
        const booking2 = new Booking({name: 'Fred Smith', room: room2, checkIn: new Date('2022-8-29'), checkOut: new Date('2022-9-8')}); //10%
        room2.bookings = [booking2];
        
        const room3 = new Room({name: 'Ocean view', price: 35000, discount: 0});
        const booking3 = new Booking({name: 'Fred Smith', room: room3, checkIn: new Date('2022-8-27'), checkOut: new Date('2022-9-5')}); //30%
        room3.bookings = [booking3];

        rooms = [room1, room2, room3];
        expect(totalOccupancyPercentage(rooms, new Date('2022-8-20'), new Date('2022-8-30'))).toBe(30);
    });

    test('with tree reservation - occupancy 10%', () => {
        let rooms = [];
        const room1 = new Room({name: 'Ocean view suite', price: 35000, discount: 0});
        const booking1 = new Booking({name: 'Fred Smith', room: room1, checkIn: new Date('2022-8-10'), checkOut: new Date('2022-8-15')}); //0%
        room1.bookings = [booking1];
        
        const room2 = new Room({name: 'Dual suite', price: 35000, discount: 0});
        const booking2 = new Booking({name: 'Fred Smith', room: room2, checkIn: new Date('2022-8-31'), checkOut: new Date('2022-9-8')}); //0%
        room2.bookings = [booking2];

        const room3 = new Room({name: 'Ocean view', price: 35000, discount: 0});
        const booking3 = new Booking({name: 'Fred Smith', room: room3, checkIn: new Date('2022-8-27'), checkOut: new Date('2022-9-5')}); //30%
        room3.bookings = [booking3];

        rooms = [room1, room2, room3];
        expect(totalOccupancyPercentage(rooms, new Date('2022-8-20'), new Date('2022-8-30'))).toBe(10);
    });

    test('with tree reservation - occupancy 100%', () => {
        let rooms = [];
        const room1 = new Room({name: 'Ocean view suite', bookings: [], price: 35000, discount: 0});
        const booking1 = new Booking({name: 'Fred Smith', room: room1, checkIn: new Date('2022-8-10'), checkOut: new Date('2022-8-15')}); //0%
        room1.bookings = [booking1];

        rooms = [room1];
        expect(totalOccupancyPercentage(rooms, new Date('2022-8-10'), new Date('2022-8-15'))).toBe(100);
    });
});

describe('availableRooms', () => {
    test('booking date ( with toEqual(expect.arrayContaining(AvailableRooms))//"Dual suite","Ocean view")', () => {
        let rooms = [];
        const room1 = new Room({name: 'Ocean view suite', price: 35000, discount: 0});
        const booking1 = new Booking({name: 'Fred Smith', room: room1, checkIn: new Date('2022-8-29'), checkOut: new Date('2022-9-8')});
        room1.bookings = [booking1];
        
        const room2 = new Room({name: 'Dual suite', price: 35000, discount: 0});
        const booking2 = new Booking({name: 'Fred Smith', room: room2, checkIn: new Date('2022-8-30'), checkOut: new Date('2022-9-6')}); //this
        room2.bookings = [booking2];

        const room3 = new Room({name: 'Ocean view', price: 35000, discount: 0});
        const booking3 = new Booking({name: 'Fred Smith', room: room3, checkIn: new Date('2022-9-1'), checkOut: new Date('2022-9-8')}); //this
        room3.bookings = [booking3];
        
        const room4 = new Room({name: 'Mountain view', price: 35000, discount: 0});
        const booking4 = new Booking({name: 'Fred Smith', room: room4, checkIn: new Date('2022-8-26'), checkOut: new Date('2022-9-5')});
        room4.bookings = [booking4];

        rooms = [room1, room2, room3, room4];
        const AvailableRooms = ["Dual suite","Ocean view"];
        expect(availableRooms(rooms, new Date('2022-8-20'), new Date('2022-8-30'))).toEqual(expect.arrayContaining(AvailableRooms));
    });

    test('booking date ( with toEqual(expect.arrayContaining(AvailableRooms))// "" )', () => {
        let rooms = [];
        const room1 = new Room({name: 'Ocean view suite', price: 35000, discount: 0});
        const booking1 = new Booking({name: 'Fred Smith', room: room1, checkIn: new Date('2022-8-29'), checkOut: new Date('2022-9-8')});
        room1.bookings = [booking1];
        
        const room2 = new Room({name: 'Dual suite', price: 35000, discount: 0});
        const booking2 = new Booking({name: 'Fred Smith', room: room2, checkIn: new Date('2022-8-27'), checkOut: new Date('2022-9-6')});
        room2.bookings = [booking2];

        const room3 = new Room({name: 'Ocean view', price: 35000, discount: 0});
        const booking3 = new Booking({name: 'Fred Smith', room: room3, checkIn: new Date('2022-9-15'), checkOut: new Date('2022-9-28')});
        room3.bookings = [booking3];
        
        const room4 = new Room({name: 'Mountain view', price: 35000, discount: 0});
        const booking4 = new Booking({name: 'Fred Smith', room: room4, checkIn: new Date('2022-8-26'), checkOut: new Date('2022-9-5')});
        room4.bookings = [booking4];

        rooms = [room1, room2, room3, room4];
        const AvailableRooms = [];
        expect(availableRooms(rooms, new Date('2022-8-20'), new Date('2022-8-30'))).toEqual(expect.arrayContaining(AvailableRooms));
    });

    test('booking date ( with toEqual(expect.arrayContaining(AvailableRooms))//"Ocean view suite")', () => {
        let rooms = [];
        const room1 = new Room({name: 'Ocean view suite', price: 35000, discount: 0});
        const booking1 = new Booking({name: 'Fred Smith', room: room1, checkIn: new Date('2022-8-30'), checkOut: new Date('2022-9-8')});
        room1.bookings = [booking1];
        
        const room2 = new Room({name: 'Dual suite', price: 35000, discount: 0});
        const booking2 = new Booking({name: 'Fred Smith', room: room2, checkIn: new Date('2022-8-27'), checkOut: new Date('2022-9-6')});
        room2.bookings = [booking2];

        const room3 = new Room({name: 'Ocean view', price: 35000, discount: 0});
        const booking3 = new Booking({name: 'Fred Smith', room: room3, checkIn: new Date('2022-8-15'), checkOut: new Date('2022-8-28')});
        room3.bookings = [booking3];
        
        const room4 = new Room({name: 'Mountain view', price: 35000, discount: 0});
        const booking4 = new Booking({name: 'Fred Smith', room: room4, checkIn: new Date('2022-8-26'), checkOut: new Date('2022-9-5')});
        room4.bookings = [booking4];

        rooms = [room1, room2, room3, room4];
        const AvailableRooms = ["Ocean view suite"];
        expect(availableRooms(rooms, new Date('2022-8-20'), new Date('2022-8-30'))).toEqual(expect.arrayContaining(AvailableRooms));
    });
});