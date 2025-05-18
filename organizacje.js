$(document).ready(function () {
  $('#orgTable').DataTable({
    language: {
      search: "Szukaj:",
      lengthMenu: "Pokaż _MENU_",
      info: "Wyświetlanie _START_–_END_ z _TOTAL_",
      paginate: {
        first: "Pierwsza",
        last: "Ostatnia",
        next: "▶",
        previous: "◀"
      },
      zeroRecords: "Brak wyników",
      infoEmpty: "Brak danych",
      infoFiltered: "(przefiltrowano z _MAX_ rekordów)"
    }
  });
});
