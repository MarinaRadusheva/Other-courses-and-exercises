function search() {
   let searchText = document.getElementById("searchText").value;
   let allTowns = Array.from(document.querySelectorAll("#towns li"));
   let count = 0;
   for (let town of allTowns) {
      if(town.innerHTML.includes(searchText)){
         count++;
         town.style.fontWeight = "bold";
         town.style.textDecoration = "underline";
      }
      else{
         town.style.fontWeight="none";
         town.style.textDecoration="none";
      }
   }
   let resultField = document.getElementById("result");
   resultField.innerText=`${count} matches found`;
}
