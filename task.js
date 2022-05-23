class AlarmClock {

    

    constructor() {
        
        this.alarmCollection = [];
        this.timerId = null;
        
    }

    addClock(time, callback, id) {

        if (id === undefined) throw new Error('Невозможно идентифицировать будильник. Параметр id не передан.');
        
        if (this.alarmCollection.find(element => element.id === id)) {
            console.error('Будильник с таким id уже существует.');
            return;
        }

        return this.alarmCollection.push(
            {id, time, callback}
        )
    }

    removeClock(id) {

        let preLength = this.alarmCollection.length;

        const indexResult = this.alarmCollection.findIndex((object) => object.id === id);
        this.alarmCollection.splice(indexResult, 1);

        return  (preLength - this.alarmCollection.length !==0);

    }

    getCurrentFormattedTime() {
        
        let nowDate = new Date();
        return (
            nowDate.toLocaleTimeString("ru-Ru", {
                hour: "2-digit",
                minute: "2-digit",
            })
        )
    }

    start() {
    
        checkClock = checkClock.bind(this);

        function checkClock(time, callback) {
            
            if (time === this.getCurrentFormattedTime()) callback();
        }  

  
        if (this.timerId === null) {

            

            this.timerId = setInterval(
            
                () => {
                    
                    for (const item of this.alarmCollection) {
                       let currentTime = item.time;
                       let currentCallback = item.callback;
                       checkClock(currentTime, currentCallback);
                    }
                }
            )
        }
    } 
   
    stop() {

        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }

    }

    printAlarms() {
		
		return this.alarmCollection.forEach(clock => console.log(clock.id + ': ' + clock.time));

        //this.alarmCollection.forEach((item, idx) => console.log('Будильник №' + this.alarmCollection[idx].id + ' заведён на' + this.alarmCollection[idx].time));

    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [] ;
    }

}
let PhoneClock = new AlarmClock();
PhoneClock.addClock('20:15', () => console.log ('Первый'), 1);
PhoneClock.addClock('23:25', () => console.log ('Второй'), 2);
PhoneClock.addClock('19:39', () => console.log ('Третий'), 3);
PhoneClock.removeClock(2);
PhoneClock.addClock('18:39', () => console.log ('Четвертый'), 2);
PhoneClock.start();
PhoneClock.stop();
PhoneClock.printAlarms();


