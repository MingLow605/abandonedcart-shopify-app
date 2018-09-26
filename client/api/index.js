import { ExportToCsv } from 'export-to-csv';

export function downloadAbandonedCart() {
  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };
  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Abandoned Cart Items',
    useBom: true,
    useKeysAsHeaders: true
  };
  const csvField = [];

  return () => {
    return fetch(`/shopify/api/checkouts.json`, fetchOptions)
      .then(response => response.json())
      .then(abandonedItems => {
        abandonedItems.checkouts.forEach(item => {
          item.line_items.forEach(product => {
            csvField.push({
              Product: product.title,
              ProductPrice: product.price,
              Email: item.email,
              CustomerAddress: item.customer.default_address
                ? item.customer.default_address.address1 +
                  ' ' +
                  item.customer.default_address.city +
                  ' ' +
                  item.customer.default_address.country
                : '',
              Shipping_address: item.shipping_address
                ? item.shipping_address.address1 +
                  ' ' +
                  item.shipping_address.city +
                  ' ' +
                  item.shipping_address.country
                : '',
              TotalPrice: item.total_price
            });
          });
        });
        return csvField;
      })
      .then(csvField => {
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(csvField);
      })
      .catch(err => {
        console.error(err);
      });
  };
}
