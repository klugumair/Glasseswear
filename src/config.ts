export const business = {
  name: 'Al-Safa Optics',
  whatsapp: '923488959807',
  location: 'Soan Gardens, Islamabad',
  mapsUrl: 'https://maps.app.goo.gl/HHAwSNf4BLTHHfX79',
}

export const whatsappUrl = (message: string) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
