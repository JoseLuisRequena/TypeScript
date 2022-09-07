var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
;
;
var Room = /** @class */ (function () {
    function Room(_a) {
        var name = _a.name, bookings = _a.bookings, price = _a.price, discount = _a.discount;
        this.name = name;
        this.bookings = bookings;
        this.price = price;
        this.discount = discount;
    }
    ;
    Room.prototype.isOccupied = function (date) {
        if (this.bookings.length) {
            for (var i = 0; i < this.bookings.length; i++) {
                if (date >= this.bookings[i].checkIn && date <= this.bookings[i].checkOut) {
                    return this.bookings[i].name;
                }
                ;
            }
            ;
        }
        ;
        return false;
    };
    ;
    Room.prototype.occupancyPercentage = function (startDate, endDate) {
        //poblar un array con los dias seleccionados
        if (this.bookings.length) {
            var ArrayDatesSerch = arrayDate(startDate, endDate);
            var daysOccupancy = [];
            for (var _i = 0, ArrayDatesSerch_1 = ArrayDatesSerch; _i < ArrayDatesSerch_1.length; _i++) {
                var day = ArrayDatesSerch_1[_i];
                this.isOccupied(day) ? daysOccupancy.push(day) : 0;
            }
            ;
            var OccupancyPercentage = (daysOccupancy.length * 100) / ArrayDatesSerch.length;
            return OccupancyPercentage;
        }
        ;
        return 0;
    };
    ;
    return Room;
}());
;
var Booking = /** @class */ (function () {
    function Booking(_a) {
        var name = _a.name, email = _a.email, room = _a.room, checkIn = _a.checkIn, checkOut = _a.checkOut, discount = _a.discount;
        this.name = name;
        this.email = email;
        this.room = room;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
    }
    ;
    Object.defineProperty(Booking.prototype, "fee", {
        get: function () {
            return;
            //returns the fee, including discounts on room and guest
            //devuelve la tarifa, incluidos los descuentos en la habitación y el invitado
        },
        enumerable: false,
        configurable: true
    });
    ;
    return Booking;
}());
;
function totalOccupancyPercentage(rooms, startDate, endDate) {
    if (rooms.length) {
        var ArrayDatesSerch = arrayDate(startDate, endDate);
        var daysOccupancy = [];
        for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
            var room = rooms_1[_i];
            for (var _a = 0, ArrayDatesSerch_2 = ArrayDatesSerch; _a < ArrayDatesSerch_2.length; _a++) {
                var day = ArrayDatesSerch_2[_a];
                room.isOccupied(day) ? daysOccupancy.push(day) : 0;
            }
            ;
        }
        ;
        var TotalOccupancyPercentage = (daysOccupancy.length * 100) / (ArrayDatesSerch.length * rooms.length);
        return TotalOccupancyPercentage;
    }
    ;
    return 0;
}
;
function availableRooms(rooms, startDate, endDate) {
    if (rooms.length) {
        var ArrayDatesSerch = arrayDate(startDate, endDate);
        var unoccupiedRooms = [];
        for (var _i = 0, rooms_2 = rooms; _i < rooms_2.length; _i++) {
            var room = rooms_2[_i];
            var daysOccupancy = [];
            for (var _a = 0, ArrayDatesSerch_3 = ArrayDatesSerch; _a < ArrayDatesSerch_3.length; _a++) {
                var day = ArrayDatesSerch_3[_a];
                room.isOccupied(day) ? daysOccupancy.push(day) : 0;
            }
            ;
            if (!daysOccupancy.length) {
                unoccupiedRooms.push(room.name);
            }
            ;
        }
        ;
        return unoccupiedRooms;
    }
    ;
    return false;
}
;
//Calcular el rango de días a comprobar
function arrayDate(startDate, endDate) {
    var ArrayDates = [];
    while (startDate < endDate) {
        ArrayDates = __spreadArray(__spreadArray([], ArrayDates, true), [new Date(startDate)], false);
        startDate.setDate(startDate.getDate() + 1);
    }
    ;
    return ArrayDates;
}
;
module.exports = { Room: Room, Booking: Booking, totalOccupancyPercentage: totalOccupancyPercentage, availableRooms: availableRooms };
