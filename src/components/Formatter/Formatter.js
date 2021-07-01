export const priceFormatter = new Intl.NumberFormat('pl', {
  style: 'currency',
  currency: 'PLN',
})

export const quantityFormatter = quantity => {
  const lastNumber = quantity.toString()
  if (quantity == 1) {
    return 'sztukę'
  } else if (
    (quantity < 10 || quantity > 20) &&
    (lastNumber == 2 || lastNumber == 3 || lastNumber == 4)
  ) {
    return 'sztuki'
  } else {
    return 'sztuk'
  }
}
