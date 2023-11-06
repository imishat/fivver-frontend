
function SubCategoriesCard({inputValues,subCat,i,handleInputChange}) {
   
    return (
        <div key={i} className="flex items-center gap-2">
        <input
        //   onChange={(e) => {
        //     e.target.checked
        //       ? subCategoryId.push(e.target.value)
        //       : (subCategoryId = subCategoryId.filter(
        //           (sub) => sub !== e.target.value
        //         ));
        //   }}
          className="checkbox checkbox-bordered rounded-none checkbox-sm "
          type="checkbox"         
          value={inputValues[i]}
          onChange={event => handleInputChange(i, event)}
          id={subCat?.subcategoryId}
        //   ={subCat?.subcategoryId}
        />
        <label
          htmlFor={subCat?.subcategoryId}
          className="cursor-pointer select-none"
        >
          {subCat?.name} <span className="font-bold">({subCat?.price})</span>
        </label>
      </div>
    );
}

export default SubCategoriesCard;