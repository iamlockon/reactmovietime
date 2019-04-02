function importAll(r) {
  //console.log("importAll:",r.keys());
  return r.keys().map(r);
}
const images = importAll(require.context('../public/images', false, /\.(jpe?g)$/));
//console.log("IMG:",images);
const t = ['Go deep', 'Mummy', 'Yeah yo yo', '4','5','6','7'];

const tileData = [];
images.forEach((img, index) => {
  //console.info(img);
  tileData.push({
    img: img,
    title: t[index],
    koremitai: index,
    ikoremitai: !!(index % 2),
    length: Math.floor(Math.random()*100),
  })
});
export default tileData;