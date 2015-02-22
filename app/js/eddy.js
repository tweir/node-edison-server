define(function () {
    function clientTemplate(id,name,status)
    {
      return "<div id='client-" + id + "' data-id='"+id+"'  >" +
             "<div><span class='client-name'>" + name + "</span></div>" +
             "<div>Status:<span class='clientstatus'>"+status+"</span></div>" +
             "<div class='client-sensors'></div>";
    }

    function sensorTemplate(id,name,currentValue){
      var divId = "sensor-"+id+"-"+name;
      return "<div id='"+divId+"' >" +
             "<span class='sensor_name'>" + name + "</span>" +
             "<span class='sensor_value'>" + currentValue + "</span" +
             "</div";
    }

    var Eddy = function(id,name){
      this.id = id;
      this.name = name;
      this.status = "disconnected";
    }

    Eddy.prototype.setStatus = function(status){
      this.status = status;      
      var divSelector = '#' + this.clientDivId();
      $(divSelector + ' .clientstatus').text(this.status);
    }

    Eddy.prototype.clientDivId = function(){
      return 'client-' + this.id;
    }
    Eddy.prototype.sensorDivId = function(sensorName){
      return "sensor-" + this.id + "-" + sensorName;
    }

    Eddy.prototype.ensureView = function(){
      var divSelector = '#' + this.clientDivId();
      if ($(divSelector).length == 0){
        $('#eddyclients').append(clientTemplate(this.id,this.name,this.status));
      } 
    }
    Eddy.prototype.ensureSensorView = function(name,value){
      var divSelector = '#' + this.sensorDivId(name);
      var clientDivSensors = '#' + this.clientDivId() + ' .client-sensors';
      if ($(divSelector).length == 0){
        $(clientDivSensors).append(sensorTemplate(this.id,name,value));
      } 
    }

    Eddy.prototype.setSensorValue = function(name,value){
      this.ensureSensorView(name,value);
      var divSelector = '#' + this.sensorDivId(name);
      $(divSelector + ' .sensor_value').text(value);
    }


    return {
      create: function(id,name){
        return new Eddy(id,name);
      }
    }
  }
)