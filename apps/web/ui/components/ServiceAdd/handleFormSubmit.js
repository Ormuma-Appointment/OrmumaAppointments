export function handleFormSubmit(e, services) {
  e.preventDefault();
  let newServices = services.reduce((result, service, index) => {
    let category = e.target.category[index].value;
    let duration = Number(e.target.duration[index].value);
    let waiting = Number(e.target.waiting[index].value);
    let price = Number(e.target.price[index].value);

    let serviceData = { service, price, duration, waiting };
    let categoryData = result.find((cat) => cat.category === category);
    if (!categoryData) {
      categoryData = { category, services: [] };
      result.push(categoryData);
    }
    categoryData.services.push(serviceData);
    return result;
  }, []);
  return newServices;
}
