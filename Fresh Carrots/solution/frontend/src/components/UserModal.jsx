import {useEffect, useState} from "react";

/**
 * UserModal component manages the user identification process.
 * It displays a Bootstrap modal prompting the user to enter a username,
 * stores the username in localStorage, and passes it back to the parent via callback.
 *
 * @param {Object} props - Component props.
 * @param {string} props.username - Current username state.
 * @param {function} props.onSetUsername - Callback function to update the username state in the parent.
 * @returns {JSX.Element} The UserModal component JSX.
 */
function UserModal({ username, onSetUsername }) {
    const [errorModal, setErrorModal] = useState(false);

    useEffect(() => {
        /* initialize username retrieving from local storage */
        const user = JSON.parse(localStorage.getItem("username")) || "";
        if (user) {
            onSetUsername(user);
        } else {
            //if not present ask the user to insert it
            const modalElement = document.getElementById("modalUsername");
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show(); //show the bootstrap modal
            return;
        }
        //retrieve past followed discussion from the localstorage, if present
    }, []);

    // submiut username in the modal, store in useState
    function handleSubmitModal() {
        if(username!== "") {
            localStorage.setItem("username", JSON.stringify(username));
            const modalElement = document.getElementById("modalUsername");
            const modal = window.bootstrap.Modal.getInstance(modalElement)
            modal.hide();

            document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
        }
        else{
            setErrorModal(true);
        }
    }

    return (<>
        <div id="modalUsername" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Enter a username to discuss among members.</h5>
                    </div>
                    <div className="modal-body">
                        {errorModal && <h6 className="text-danger">Username is required</h6>}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type..."
                            value={username}
                            onChange={(e) => onSetUsername(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={handleSubmitModal}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default UserModal