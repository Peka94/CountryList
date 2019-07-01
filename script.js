$(() => {

  // kiszervezett függvény, a get request válaszát betöltjük a táblázatba
  function refreshTable(dataList){
      $('table tbody tr.prototype').siblings().remove();
      let i = 1;
      dataList.forEach(country => {
        const $clone = $('table tr.prototype').clone();

        // hozzáadjuk a data id hoz az id-t
        $clone.attr('data-id', i);

        // feltöltjük a táblázatot
        $clone.children('.country-name').text(dataList.name);
        $clone.children('.area').text(dataList.area);
        $clone.children('.population').text(dataList.population);
        $clone.children('.capital').text(dataList.capital);
        // levesszük a klónunkról a d-none-t, illetve a prototype-t
        $clone.removeClass('d-none prototype')
        $('table tbody').append($clone);
        i++;
      });

    };

  $.ajax({
      url: 'https://restcountries.eu/rest/v2/all',
      success: function(data) {
        const dataList = data;
        console.log(data);
        refreshTable(dataList);
      },
      dataType: 'json',
      method: 'GET',

    },
  );

});
