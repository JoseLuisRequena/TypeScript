interface IRoom { 
    name: string;
    bookings: IBooking[];
    price: number; 
    discount: number;
};

interface IBooking{
    name: string,
    email: string,
    checkIn: Date,
    checkOut: Date,
    discount: number,
    room: IRoom
};

class Room implements IRoom{
    name: string;
    bookings: IBooking[];
    price: number; 
    discount: number;

    constructor({name, bookings, price, discount}: IRoom){
        this.name = name;
        this.bookings = bookings;
        this.price = price;
        this.discount = discount;
    };

    isOccupied(date: Date): boolean|string{
        if(this.bookings.length){
            for(let i = 0 ; i < this.bookings.length; i++){
                if(date >= this.bookings[i].checkIn && date <= this.bookings[i].checkOut){
                    return this.bookings[i].name
                };
            };
        };
        return false;
    };

    occupancyPercentage(startDate: Date, endDate: Date): number{
        //poblar un array con los dias seleccionados
        if (this.bookings.length){
            const ArrayDatesSerch = arrayDate (startDate, endDate);
            let daysOccupancy: Date[] = [];

            for(let day of ArrayDatesSerch){
                this.isOccupied(day) ? daysOccupancy.push(day) : 0;
            };
            const OccupancyPercentage = (daysOccupancy.length * 100) / ArrayDatesSerch.length;
            
            return OccupancyPercentage;
        };
        return 0;
    };
};

class Booking implements IBooking{
    name: string;
    email: string;
    room: IRoom;
    checkIn: Date;
    checkOut: Date;
    discount: number;
    
    constructor({name, email, room, checkIn, checkOut, discount}: IBooking){
        this.name = name;
        this.email = email;
        this.room = room;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
    };

    get fee(){
        
        return ;
        //returns the fee, including discounts on room and guest
        //devuelve la tarifa, incluidos los descuentos en la habitación y el invitado
    };
};

function totalOccupancyPercentage(rooms: Room[], startDate: Date, endDate: Date): number { 
    if(rooms.length){
        const ArrayDatesSerch: Date[] = arrayDate(startDate, endDate);
        let daysOccupancy: Date[] =  [];

        for(let room of rooms){
            for(let day of ArrayDatesSerch){
                room.isOccupied(day) ? daysOccupancy.push(day) : 0;
            };
        };
        const TotalOccupancyPercentage = (daysOccupancy.length * 100) /(ArrayDatesSerch.length * rooms.length);
        
        return TotalOccupancyPercentage;
    };
    return 0;
};

function availableRooms(rooms: Room[], startDate: Date, endDate: Date): string[]| boolean{
    if(rooms.length){
        const ArrayDatesSerch: Date[] = arrayDate(startDate, endDate);
        let unoccupiedRooms: string[] = [];
        
        for(let room of rooms){
            let daysOccupancy: Date[] = [];
            for(let day of ArrayDatesSerch){
                room.isOccupied(day) ? daysOccupancy.push(day) : 0;
            };
            
            if(!daysOccupancy.length){
                unoccupiedRooms.push(room.name);
            };
        };
        return unoccupiedRooms;
    };
    return false;
};
//Calcular el rango de días a comprobar
function arrayDate(startDate: Date, endDate: Date): Date[]{
    let ArrayDates: Date[] = [];

    while(startDate < endDate){
        ArrayDates = [...ArrayDates, new Date(startDate)];
        startDate.setDate(startDate.getDate() + 1);
    };
    return ArrayDates;
};

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms };