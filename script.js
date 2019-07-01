$(() => {

  var dataList;

  // rendezés főváros szerint
  function sorterByCapital() {
    dataList = dataList.sort(function(a, b) {
      var x = a.capital.toLowerCase();
      var y = b.capital.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  // rendezés név szerint
  function sorterByName() {
    dataList = dataList.sort(function(a, b) {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  // rendezés szám szerint
  function sorterByNumber() {
    dataList = dataList.sort(function(a, b) {
      return (a-b);
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

      // levesszük a klónunkról a d-none-t, illetve a prototype-t
      $clone.removeClass('d-none prototype')
      $('table tbody').append($clone);
      i++;
    });
  };

  // Get lekérés a szerverről
  $.ajax({
    url: 'https://restcountries.eu/rest/v2/all',
    success: function(data) {
      dataList = data;
      refreshTable(dataList);
    },
    dataType: 'json',
    method: 'GET',
  });

  // A country cellára kattintva sorba rendezi
  $('.country-column').click(function(){
    $('table tbody tr.prototype').siblings().remove();
    sorterByName();
    refreshTable(dataList);
  });

  // A főváros cellára kattintva sorba rendezi
  $('.capital-column').click(function(){
    $('table tbody tr.prototype').siblings().remove();
    sorterByCapital();
    refreshTable(dataList);
  });

  // A populáció cellára kattintva sorba rendezi
  $('.population-column').click(function(){
    $('table tbody tr.prototype').siblings().remove();
    sorterByNumber();
    refreshTable(dataList);
    console.log('pop')
  });

  // A terület cellára kattintva sorba rendezi
  $('.area-column').click(function(){
    $('table tbody tr.prototype').siblings().remove();
    sorterByNumber();
    refreshTable(dataList);
    console.log('area')
  });
});
