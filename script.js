$(() => {
  var map = null;
  var myMarker;
  var myLatlng;


  const deleteTr = $('table tbody tr.prototype').siblings().remove();
  var dataList;
  function showLoading() {
    $('#loading').removeClass('d-none');
  }

  function hideLoading() {
    $('#loading').addClass('d-none');
  }



  // rendezés főváros szerint
  function sortByCapital() {
    dataList = dataList.sort(function(a, b) {
      var x = a.capital.toLowerCase();
      var y = b.capital.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  // rendezés név szerint
  function sortByName() {
    dataList = dataList.sort(function(a, b) {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  // rendezés szám szerint
  function sortByPopulation() {
    dataList = dataList.sort(function(a, b) {
      return a.population-b.population;
    });
  };

  // rendezés terület szerint
  function sortByArea() {
    dataList = dataList.sort(function(a, b) {
      return a.area-b.area;
    });
  };

  // kiszervezett függvény, a get request válaszát betöltjük a táblázatba
  function refreshTable(dataList) {
    $('table tbody tr.prototype').siblings().remove();
    let i = 1;
    dataList.forEach(country => {
      const $clone = $('table tbody tr.prototype').clone();

      // hozzáadjuk a data id hoz az id-t
      $clone.attr('data-id', i);

      // feltöltjük a táblázatot, az üres cellákat kitöltjük
      $clone.children('.country-name').text(country.name);
      if (country.area == null) {
        $clone.children('.area').text('0');
      } else {
        $clone.children('.area').text(country.area);
      }
      if (country.population == "") {
        $clone.children('.population').text(0);
      } else {
        $clone.children('.population').text(country.population);
      }
      if (country.capital == "") {
        $clone.children('.capital').text('-');
      } else {
        $clone.children('.capital').text(country.capital);
      }
      $clone.children('td').children('.btn').attr('data-lat',(country.latlng[0]));
      $clone.children('td').children('.btn').attr('data-lng',(country.latlng[1]));
      // levesszük a klónunkról a d-none-t, illetve a prototype-t
      $clone.removeClass('d-none prototype')
      $('table tbody').append($clone);
      i++;
    });
  };

  showLoading();
  // Get lekérés a szerverről
  $.ajax({
    url: 'https://restcountries.eu/rest/v2/all',
    success: function(data) {
      dataList = data;
      hideLoading();
      refreshTable(dataList);
    },
    dataType: 'json',
    method: 'GET',
  });

  // rendezés ország szerint
  $('table tr i.country').click(function(){
    deleteTr;
    sortByName();
    refreshTable(dataList);
  });

    // rendezés főváros szerint
  $('table tr i.capital').click(function(){
    deleteTr;
    sortByCapital();
    refreshTable(dataList);
  });

    // rendezés terület szerint
  $('table tr i.area').click(function(){
    deleteTr;
    sortByArea();
    refreshTable(dataList);
  });

    // rendezés populáció szerint
  $('table tr i.population').click(function(){
    deleteTr;
    sortByPopulation();
    refreshTable(dataList);
  });

  function initializeGMap(lat, lng) {
      myLatlng = new google.maps.LatLng(lat, lng);

      var myOptions = {
        zoom: 5,
        zoomControl: true,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

      myMarker = new google.maps.Marker({
        position: myLatlng
      });
      myMarker.setMap(map);
    }

    // Re-init map before show modal
    $('#myModal').on('show.bs.modal', function(event) {
      var button = $(event.relatedTarget);
      initializeGMap(button.data('lat'), button.data('lng'));
      $("#location-map").css("width", "100%");
      $("#map_canvas").css("width", "100%");
    });

    // Trigger map resize event after modal shown
    $('#myModal').on('shown.bs.modal', function() {
      google.maps.event.trigger(map, "resize");
      map.setCenter(myLatlng);
    });
});
