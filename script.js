$(() => {

  $('.country-name').click(function(){
    console.log('aaaa');
    //initMap($(this).children('position').text());

  });
  
  function showLoading() {
    $('#loading').removeClass('d-none');
  }

  function hideLoading() {
    $('#loading').addClass('d-none');
  }

  var dataList;

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

      let position = {lat: country.latlng[0], lng: country.latlng[1]};
      $clone.children('.position').text(position);
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
    $('table tbody tr.prototype').siblings().remove();
    sortByName();
    refreshTable(dataList);
  });

    // rendezés főváros szerint
  $('table tr i.capital').click(function(){
    $('table tbody tr.prototype').siblings().remove();
    sortByCapital();
    refreshTable(dataList);
  });

    // rendezés terület szerint
  $('table tr i.area').click(function(){
    $('table tbody tr.prototype').siblings().remove();
    sortByArea();
    refreshTable(dataList);
  });

    // rendezés populáció szerint
  $('table tr i.population').click(function(){
    $('table tbody tr.prototype').siblings().remove();
    sortByPopulation();
    refreshTable(dataList);
  });



});



function initMap(position) {
  // The location
  //var uluru = {lat: -25.344, lng: 131.036};
  // The map centered
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: position});
  // The marker
  var marker = new google.maps.Marker({position: position, map: map});
};
