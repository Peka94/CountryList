$(() => {

  function showLoading() {
    $('#loading').removeClass('d-none');
  }

  function hideLoading() {
    $('#loading').addClass('d-none');
  }


  // kiszervezett függvény, a get request válaszát betöltjük a táblázatba
  function refreshTable(dataList) {
    $('table tbody tr.prototype').siblings().remove();
    hideLoading();
    let i = 1;
    dataList.forEach(country => {
      const $clone = $('table tbody tr.prototype').clone();

      // hozzáadjuk a data id hoz az id-t
      $clone.attr('data-id', i);

      // feltöltjük a táblázatot
      $clone.children('.country-name').text(country.name);
      $clone.children('.area').text(country.area);
      $clone.children('.population').text(country.population);
      $clone.children('.capital').text(country.capital);
      // levesszük a klónunkról a d-none-t, illetve a prototype-t
      $clone.removeClass('d-none prototype')
      $('table tbody').append($clone);
      i++;
    });

  };

  showLoading();
  $.ajax({
    url: 'https://restcountries.eu/rest/v2/all',
    success: function(data) {
      const dataList = data;
      console.log(data);
      refreshTable(dataList);
    },
    dataType: 'json',
    method: 'GET',

  }, );

});
