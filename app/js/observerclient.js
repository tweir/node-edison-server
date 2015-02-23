define(["util","eddy"],function (util,eddy) {
    var eddyRepo = {};
    var oc = {};

    function connectClient(data){
      var id = getClientId(data);
      var name = getClientName(data);
      var e = eddy.create(id,name);
      eddyRepo[id]=e;
      e.ensureView();
      e.setStatus('connected');
    }

    function getClientId(data){
      return data.id.replace(/ /g,"_");
    }

    function getClientName(data){
      if (data.name===undefined){
        return data.id;
      }
      else
      {
        return data.name;
      }
    }

    function disconnectClient(data){
      var id = getClientId(data);
      e = eddyRepo[id];
      e.setStatus('disconnected')
    }

    function handleEddyData(data)
    {
      var id = getClientId(data);
      var sensorName = data.sensor;
      var sensorValue = data.value;
      e = eddyRepo[id];
      e.setSensorValue(sensorName,sensorValue);
    }

    function updateEddyList(data){
      for( var i=0; i<data.length; i++)
      {
        var d=data[i];
        var id = getClientId(d);
        var name = getClientName(d);
        var e = eddy.create(id,name);
        eddyRepo[id]=e;
        e.ensureView();
        e.setStatus(d.status);

        for(var name in d.sensors) {
          if(d.sensors.hasOwnProperty(name)){
            e.setSensorValue(name,d.sensors[name]);
          }
        }
      }

    }

    function createPingCommand(socket,data){
      var id = data.id; //Use original id...
      var command_data = {clientId:id, command:'ping'};
      setInterval(function(){
        socket.emit('send_eddy_command',command_data);
      },5000);
    }

    return {
        setup: function () {
          console.log("Ready (in OC)");
          oc.socket = io(); 
          oc.socket.on('connect', function () { 
            console.log("Connected");
            oc.socket.emit('init',{clientType:'web',id:util.guid()});
          });
          oc.socket.on('eddy_connected', function(data) {
            console.log("Eddy connected");
            console.log(data);
            connectClient(data);
            createPingCommand(oc.socket,data);
          });
          oc.socket.on('current_eddy_list', function(data) {
            console.log("Eddy list update");
            console.log(data);
            updateEddyList(data);
          });
          oc.socket.on('eddy_disconnected', function(data) {
            console.log("Eddy disconnected");
            console.log(data);
            disconnectClient(data);
          });
          oc.socket.on('eddy_data',function(data) {
            console.log("Eddy data");
            console.log(data);
            handleEddyData(data);
          });
          oc.socket.on()
        }
    };
});