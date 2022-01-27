
// TODO
// Komin virkni til að búa til cols fyrir hvert gagnasett, þarf að laga fyrir
// Síðustu, jafnvel bæta fyrir responsive ef tími gefst

export function makeDataset(title = []) {
    let cardTitle = ``;
    for(let i = 0; i < title.length; i++) {
      // Loka röð
      if (i > 0 && i % 3 == 0) {
        cardTitle += `
        </div>dsaf
        `;
      }
      // Ný röð
      if (i % 3 == 0) {
        cardTitle += `
        <div class="row">
        `;
      }
      cardTitle += `
      <div class="col col-4">
        <h2>${title[i]}</h2>
      </div>
      `;
  
      
    }
    cardTitle += `
    </div>
    `
    return cardTitle;
  }

async function main() {
    const x = makeDataset([1,2,3,4,5,6,7,8])
    console.log(x)
    console.log("KDJFKJDK");
}main().catch((err) => console.error(err));