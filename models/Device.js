class Person {
    constructor(id, battery) {
        this.id = id;
        this.battery = battery;
        this.performance = 1.0;
        this.data_errors = 0;
        this.gps_errors =0;
        this.duplicate_data = 0;
    }

    addDuplicate_data(){
        ;
    }

    addGPS_errors(){
        ;
    }

    addDataErrors(){
        ;
    }

    updateBattery(battery){
        this.battery = battery;
    }

    // Getters
    get getId(){
        return this.id;
    }
    
    get getBattery(){
        return this.battery;
    }

    get getPerformance(){
        return this.performance;
    }

    get getDataErrors(){
        return this.data_errors;
    }

    get getGPSErrors(){
        return this.gps_errors;
    }

    get getDuplicate_data(){
        return this.duplicate_data;
    }
}