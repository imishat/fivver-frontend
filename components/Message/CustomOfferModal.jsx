function CustomOfferModal() {
    return (
<dialog id="custom_offer" className="modal">
  <div className="modal-box rounded-none bg-blue-400">
    <div>
        <h2>Create a single payment offer</h2>
    </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    );
}

export default CustomOfferModal;