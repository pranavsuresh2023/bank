import React, { useState, useEffect } from 'react';
import './Request.css';
import { Link } from 'react-router-dom';
import data from './Data';
import quest from './Questions';

function Request() {
  const [formData, setFormData] = useState({
    branchCode: '',
    branchName: '',
    customerName: '',
    customerAccountNumber: '',
    customerAccountType: '',
  });

  const [selectedAccountNumber, setSelectedAccountNumber] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(e);
  };

  useEffect(() => {
    const getItemsFromLocalStorage = () => {
      const storedFormData = localStorage.getItem('formData');
      if (storedFormData) {
        setFormData(JSON.parse(storedFormData));
      }
    };
    getItemsFromLocalStorage();
  }, []);

  const handleProceedContinue = () => {
    setProceedContinue(false); // Hide the "Proceed To Continue" button
    setShowTodo(true); // Show the "todo" div
  };

  const [showTodo, setShowTodo] = useState(false);

  const [proceedContinue , setProceedContinue]=useState(
    JSON.parse(localStorage.getItem('proceedContinue')) || false
  )


  const localsaveddata = JSON.parse(localStorage.getItem('qus'));
  const [questions, setQuestion] = useState(localsaveddata ? localsaveddata : quest);

  const filteredAccounts = data.filter((account) => account.customeraccountnumber === selectedAccountNumber);

  const handleAccountNumberClick = (accountNumber) => {
    setSelectedAccountNumber(accountNumber);
  };

  const handleAnswerChange = (index, selectedAnswer) => {
    if (index >= 0 && index < questions.length) {
      const question = questions[index];
      console.log(question.answer, selectedAnswer);
      if (question.answer === selectedAnswer) {
        const updated = [...questions];
        updated[index].answers = selectedAnswer;
        if (updated[index + 1]) {
          updated[index + 1].isVisible = true;
        }
        if (index === questions.length - 1) {
          setShowUpload(true);
        }
        setQuestion(updated);
      } else {
        alert('Service Gesture Policy');
      }
    }
  };

  function upload() {
    localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem('qus', JSON.stringify(quest));
    setShowUpload(false);
    setProceedContinue(true)
    localStorage.setItem('proceedContinue', JSON.stringify(true));
    alert('Successfully Uploaded');
  }

  //todoapp
  const [recommendedNames, setRecommendedNames] = useState([]);
  const [newName, setNewName] = useState('');

  const addRecommendedName = () => {
    if (newName.trim() !== '') {
      setRecommendedNames((prevNames) => [...prevNames, newName]);
      setNewName('');
    }
  };

  const deleteRecommendedName = (index) => {
    setRecommendedNames((prevNames) =>
      prevNames.filter((_, i) => i !== index)
    );
  };
  
  return (
    <div className='request-portal'>
      <div className='requestbody'>
        <div className='requesthead'>
          <div className='requestformhead'>
            <h1>REQUEST FORM</h1>
          </div>
          <div className='linktodash'>
            <Link to='/'>DASHBOARD</Link> / REQUEST FORM
          </div>
        </div>
        <div className='maindiv'>
          <div className='requestform'>
            <div className='items'>
              <label htmlFor='branch-code'>Branch Code*</label>
              <div>
                <input
                  className='inputs'
                  type='text'
                  name='branchCode'
                  value={formData.branchCode}
                  onChange={(e) => handleInputChange(e)}
                  id='branch-code'
                  placeholder='Branch Code'
                />
              </div>
            </div>
            <div className='items'>
              <label htmlFor=''>Branch Name*</label>
              <div>
                <input
                  className='inputs'
                  type='text'
                  onChange={(e) => handleInputChange(e)}
                  name='branchName'
                  value={formData.branchName}
                  id='branch-name'
                  placeholder='Branch-Name'
                />
              </div>
            </div>
            <div className='items'>
              <label htmlFor=''>Customer Name*</label>
              <div>
                <input
                  className='inputs'
                  type='text'
                  value={formData.customerName}
                  onChange={(e) => handleInputChange(e)}
                  name='customerName'
                  id='customer-name'
                  placeholder='Customer Name'
                />
              </div>
            </div>
            <div className='items'>
              <label htmlFor=''>Customer Account Number*</label>
              <div>
                <input
                  className='inputs'
                  type='number'
                  value={formData.customerAccountNumber}
                  name='customerAccountNumber'
                  onChange={(e) => handleInputChange(e)}
                  id='customer-AC'
                  placeholder='Customer Account Number'
                  onClick={(e) => handleAccountNumberClick(e.target.value)}
                />
              </div>
            </div>
            <div className='items'>
              <label htmlFor=''>Customer Account Type*</label>
              <div>
                <select className='input-select' name='customerAccountType' id=''  value={formData.customerAccountType}  onChange={(e) => handleInputChange(e)}>
                  <option>---Select---</option>
                  <option>SA</option>
                  <option>CA</option>
                  <option>SA-NRE</option>
                  <option>SA-NRO</option>
                </select>
              </div>
            </div>
          </div>
          {selectedAccountNumber && (
            <div className='approved-claims'>
              <h2 className='approvedclaims-head'>Previous approved compensation claim</h2>
              <table id='claimsaprovedtable'>
                <thead>
                  <tr>
                    <th className='th-req'>Requested on</th>
                    <th className='th-req'>Compensation Amount(Rs.)</th>
                    <th className='th-req'>Reason For Compensation</th>
                    <th className='th-req'>Approved On</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account.id}>
                      <td>{account.requestedOn}</td>
                      <td>{account.compensation}</td>
                      <td>{account.reson}</td>
                      <td>{account.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {quest.map((question, index) => {
            return (
              <>
                {question.isVisible && (
                  <div className='form-questions' key={index}>
                    <div className='questions'>
                      <p>{question.question}</p>
                    </div>
                    <div className='choose-options'>
                      <label>
                        <input
                          type='radio'
                          value='Yes'
                          checked={question.answers === true}
                          onChange={() => handleAnswerChange(index, true)}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type='radio'
                          checked={question.answers === false}
                          onChange={() => handleAnswerChange(index, false)}
                        />
                        No
                      </label>
                    </div>
                  </div>
                )}
              </>
            );
          })}

          {showUpload && (
            <div className='uploading'>
              <p>Please Upload Your Compensation Letter*</p>
              <div className='upload-box-file'>
                <div className='upload-box-file1'>
                  <input type='file' />
                </div>
                <div className='uploadbtn'>
                  <button onClick={upload}>Upload</button>
                </div>
              </div>
              <ul>
                <li>Upload a maximum of five files</li>
                <li>Each with a maximum of 2 MB</li>
                <li>Allowed file types of doc, pdf, and excel</li>
              </ul>
            </div>
          )}
                { proceedContinue &&( 
                  <div className='continuebtn'>
                  <button onClick={handleProceedContinue} >Proceed To Continue</button>
                  </div>
                ) }
        </div>
        {/* <hr className='horizontalline' /> */}<br/><br/><br/>
        { showTodo && (
        <div className='todo'>
          <div className='continue-form'>
            <div className='continue-items'>
              <label>Date of Complaint (DD/MM/YY)*</label>
              <input type='date' placeholder='dd-mm-yy'/>
            </div>
            <div className='continue-items'>
              <label>Date of occurrence of Incident (DD/MM/YY)*</label>
              <input type='date' placeholder='dd-mm-yy'/>
            </div>
            <div className='continue-items'>
              <label>Date of Identification of Incident (DD/MM/YY)*</label>
              <input type='date' placeholder='dd-mm-yy'/>
            </div>
            <div className='continue-items'>
              <label>Debit GL a/c</label>
              <input type='number'/>
            </div>
            <div className='continue-items'>
              <label>Brief Description of the Incident*</label>
              <textarea rows="8" cols="50" name="comment" form="usrform" placeholder='Brief Description of the Incident'></textarea>
            </div>
            <div className='continue-items'>
              <label>Reason for Compensation*</label>
              <textarea rows="8" cols="50" name="comment" form="usrform" placeholder='Reason for Compensation'></textarea>
            </div>
            <div className='continue-items'>
              <label>Compensation claimed (Rs.)*</label>
              <input className='amount' type='number' placeholder='Compensation claimed (Rs.)'/>
            </div>
            <div className='continue-items'>
              <label>Attachment</label>
              <input className='files' type='file'/>
            </div>
            <div className='todo-app'>
              <div className='continue-items'>
                <label>Recommender Name*</label>
                <div className='todo-lists'>
                  <input
                    type='name'
                    placeholder='Enter a name or email address'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <button onClick={addRecommendedName}>+</button>
                </div>
              </div>

              <div className='recommended-names'>
                <ul>
                  {recommendedNames.map((name, index) => (
                    <li key={index}>
                      {name}
                      <button onClick={() => deleteRecommendedName(index)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='submitbtn'>
            <button>Submit</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Request;