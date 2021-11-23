function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let searchTerm = document.getElementById("searchField").value.toLowerCase();
      let rows = Array.from(document.querySelectorAll("tbody tr"));
      rows.forEach(element => {
         let text = element.textContent.toLowerCase();
         if(text.includes(searchTerm)){
            element.classList.add("select");
         }
         else{
            element.classList.remove("select");
         }
      });
      document.getElementById("searchField").value="";
   }
}