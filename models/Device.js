class Device {
    constructor(id, battery, time_stamp) {
        this.id = id;
        this.battery = battery;
        this.time_stamp = time_stamp
        this.performance = 1.0;
        this.missing_data_errors = 0;
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
}

module.exports = Device;