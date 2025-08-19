import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Modal from "react-modal";
import PropTypes from 'prop-types';
import TitleBackgroundImage from "/assets/title_background/TitleBackground_Contact.webp";
import LoadingSpinner from '../../components/Loading/Spinner/Spinner';
import LegalNotices from "../../layout/legal_notices/legal_notices";

Modal.setAppElement("#root");

// Validation patterns
const VALIDATION_PATTERNS = {
  name: /^[\p{L}\s'-]{2,}$/u,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
  tel: /^(?:\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/
};

// Initial form state
const INITIAL_FORM_STATE = {
  name: "",
  firstname: "",
  email: "",
  tel: "",
  message: "",
  checkbox: false
};

const FieldErrorTooltip = ({ id }) => (
  <>
    <i className="fa-solid fa-circle-exclamation" data-tooltip-id={`Tooltip_${id}`} data-tooltip-variant="error" />
    <ReactTooltip id={`Tooltip_${id}`} place="bottom" style={{ display: 'flex', flexDirection: 'column', padding: '5px', margin: 0 }}>
      <div>
        <ul style={{ padding: '0 3px', margin: 0, display: 'flex', justifyContent: 'center', width: '100%', listStylePosition: 'inside' }}>
          <li style={{ padding: 0, margin: 0 }}>
            {id === 'email' ? 'Doit être une adresse email valide' :
              id === 'tel' ? 'Doit être un numéro de téléphone valide' :
                id === 'message' ? 'Doit contenir 3 caractères min.' :
                  'Doit contenir 2 caractères min.'}
          </li>
        </ul>
      </div>
    </ReactTooltip>
  </>
);

FieldErrorTooltip.propTypes = {
  id: PropTypes.string.isRequired
};

const SuccessMessage = () => (
  <div className="form_success_message">
    <div className="FormSubmitInfo">
      <p>Merci ! Votre message a été envoyé avec succès.
        <i className="fa-solid fa-check" style={{ color: 'green', marginLeft: '8px' }}></i>
      </p>
    </div>
  </div>
);

const ContactForm = ({
  formRef,
  handleSubmit,
  renderField,
  isFormLoading,
  modalIsOpen,
  toggleModal,
  contact,
  handleChange,
  setIsSubmit,
  formError,
  errors,
  isSubmit
}) => (
  <form ref={formRef} onSubmit={handleSubmit} noValidate className="form_contact">
    <div className="form_contact_container">
      {renderField('name', 'Nom', 'text', { autoComplete: 'given-name', autoFocus: true })}
      {renderField('firstname', 'Prénom', 'text', { autoComplete: 'family-name' })}
    </div>
    <div className="form_contact_container">
      {renderField('email', 'Email', 'email', { autoComplete: 'email' })}
      {renderField('tel', 'Téléphone', 'tel', { autoComplete: 'tel' })}
    </div>
    {renderField('message', 'Message', 'textarea', {
      placeholder: 'Votre message...',
      rows: 10
    })}

    <label htmlFor="checkbox" className={`form_contact_checkbox_container ${errors.checkboxError && isSubmit ? 'FormError' : ''}`}>
      <input
        type="checkbox"
        id="checkbox"
        name="checkbox"
        checked={contact.checkbox}
        onChange={handleChange}
      />
      <div>
        <p className="checkbox_text">
          accepter les
        </p>
        <button onClick={() => toggleModal(true)} type="button">mentions légales</button>
      </div>
    </label>

    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => toggleModal(false)}
      contentLabel="Mentions légales"
      className="Modal_ContentContainer"
      overlayClassName="Modal_overlay"
    >
      <button onClick={() => toggleModal(false)} className="CloseButton" type="button">
        <i className="fa-solid fa-xmark"></i>
      </button>
      <div className="TextContainer" style={{ position: 'relative' }}>
        <LegalNotices />
      </div>
    </Modal>

    {isFormLoading ? (
      <LoadingSpinner />
    ) : (
      <input type="submit" value="Envoyer" onClick={() => setIsSubmit(true)} />
    )}

    {formError && (
      <div className="FormSubmitInfo">
        <div className="FormSubmitInfo_error">
          <i className="fa-solid fa-exclamation" style={{ marginRight: '20px' }}></i>
          <p>
            Une erreur est survenue, essayez
            <button type="button" onClick={() => window.location.reload()} className="refresh_button">
              d&apos;actualiser
            </button>
            la page
          </p>
          <i className="fa-solid fa-exclamation" style={{ marginLeft: '20px' }}></i>
        </div>
        <p>Si le problème persiste, contactez nous directement à l&apos;adresse suivante :</p>
        <a href="mailto:crossfitobernai@gmail.com">crossfitobernai@gmail.com</a>
      </div>
    )}
  </form>
);

ContactForm.propTypes = {
  formRef: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  renderField: PropTypes.func.isRequired,
  isFormLoading: PropTypes.bool.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    checkbox: PropTypes.bool.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  formError: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    nameError: PropTypes.bool,
    firstnameError: PropTypes.bool,
    emailError: PropTypes.bool,
    telError: PropTypes.bool,
    messageError: PropTypes.bool,
    checkboxError: PropTypes.bool
  }).isRequired,
  isSubmit: PropTypes.bool.isRequired
};

function Contact() {
  // State hooks
  const [modalIsOpen, setIsOpen] = useState(false);
  const [contact, setContact] = useState(INITIAL_FORM_STATE);
  const [isFormSent, setIsFormSent] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formError, setFormError] = useState(false);
  const [hasErrors, setHasErrors] = useState(true);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  // Modal handlers
  const toggleModal = (isOpen) => setIsOpen(isOpen);

  // Form input handler
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const formattedValue = name === 'tel' ? value.replace(/[.\s]/g, '') : value;
    setContact(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue,
    }));
  };

  // Form validation
  useEffect(() => {
    const validateForm = () => {
      const newErrors = {
        nameError: !VALIDATION_PATTERNS.name.test(contact.name),
        firstnameError: !VALIDATION_PATTERNS.name.test(contact.firstname),
        emailError: !VALIDATION_PATTERNS.email.test(contact.email),
        telError: !VALIDATION_PATTERNS.tel.test(contact.tel),
        messageError: contact.message.length <= 2,
        checkboxError: !contact.checkbox
      };

      setErrors(newErrors);
      setHasErrors(Object.values(newErrors).some(error => error));
    };

    validateForm();
  }, [contact]);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors) return;

    setIsFormLoading(true);
    try {
      const response = await axios.post(
        `/api/contact`,
        contact,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-App-Key': import.meta.env.VITE_REACT_API_KEY
          },
        }
      );

      if (response.status === 200) {
        setContact(INITIAL_FORM_STATE);
        setIsFormSent(true);
        setFormError(false);
      } else {
        setFormError(true);
      }
    } catch {
      setIsFormSent(false);
      setFormError(true);
    } finally {
      setIsFormLoading(false);
    }
  };

  // Render form field with error tooltip
  const renderField = (fieldName, label, type = "text", props = {}) => {
    const errorKey = `${fieldName}Error`;
    return (
      <label htmlFor={fieldName}>
        <p>{label}</p>
        <div>
          {type === "textarea" ? (
            <textarea
              id={fieldName}
              name={fieldName}
              className={errors[errorKey] && isSubmit ? 'FormError' : ''}
              value={contact[fieldName]}
              onChange={handleChange}
              {...props}
            />
          ) : (
            <input
              type={type}
              id={fieldName}
              name={fieldName}
              className={errors[errorKey] && isSubmit ? 'FormError' : ''}
              value={contact[fieldName]}
              onChange={handleChange}
              {...props}
            />
          )}
          {errors[errorKey] && isSubmit && (
            <FieldErrorTooltip id={fieldName} />
          )}
        </div>
      </label>
    );
  };

  // Success message or form
  return (
    <main className="main_contact">
      <div className="main__header">
        <div className="title_container">
          <img src={TitleBackgroundImage} alt="Background" />
          <p>Pour plus d&apos;informations</p>
          <h1>Contact</h1>
        </div>
      </div>

      {isFormSent ? (
        <SuccessMessage />
      ) : (
        <ContactForm
          formRef={formRef}
          handleSubmit={handleSubmit}
          renderField={renderField}
          isFormLoading={isFormLoading}
          modalIsOpen={modalIsOpen}
          toggleModal={toggleModal}
          contact={contact}
          handleChange={handleChange}
          setIsSubmit={setIsSubmit}
          formError={formError}
          errors={errors}
          isSubmit={isSubmit}
        />
      )}
    </main>
  );
}

export default Contact;
