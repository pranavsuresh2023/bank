import React from 'react';
import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import './Request.css';
import {BiAddToQueue} from 'react-icons/bi'
import {MdDeleteOutline} from 'react-icons/md'

import data from './Data';
import quest from './Question.';

function Request() {
  const [selectedAccountNumber, setSelectedAccountNumber] = useState('');

  const filteredAccounts = data.filter(
    (account) => account.customeraccountnumber === selectedAccountNumber
  );

  const handleAccountNumberClick = (accountNumber) => {
    setSelectedAccountNumber(accountNumber);
  };

  const [formData, setFormData] = useState({
    branchCode: '',
    branchName: '',
    customerName: '',
    customerAccountNumber: '',
    customerAccountType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(e)
  };

 

  const [showTodo, setShowTodo] = useState(false);





  const localData = JSON.parse(localStorage.getItem('qus'))
  const [questions, setQuestion] = useState(localData ? localData: quest);

   function upload(){

    localStorage.setItem ('formData',JSON.stringify(formData));
      localStorage.setItem('qus',JSON.stringify(quest));
    setShowUpload(false)
    setProceedContinue(true)
    localStorage.setItem('proceedContinue', JSON.stringify(true));
    
    alert("success");
    window.location.reload();

   }
  //  useEffect(()=>{
  //   const localData = JSON.parse(localStorage.getItem('question'))
  //   if(localData){
  //     setQuestion(localData) 
  //   }
  //  },[])
   useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  const handleProceedContinue = () => {
    setProceedContinue(false); // Hide the "Proceed To Continue" button
    setShowTodo(true); // Show the "todo" div
  };





  const handleAnswerChange = (index, selectedAnswer) => {
    if (index >= 0 && index < questions.length) {
      // const question = questions[index];
      console.log(questions.answer, selectedAnswer);
      if (questions[index].answer === selectedAnswer) {
        const updated = [...questions];
        updated[index].answers = selectedAnswer;
        if (updated[index + 1]) {
          updated[index + 1].isVisible = true;
        }
        if(index===questions.length-1){
        
          setShowUpload(true)
        }
        setQuestion(updated);
      } else {
        alert('Please Select Correct Answer');
      }
    }
  };



  const [recommendedNames, setRecommendedNames] = useState([]);
  const [newName, setNewName] = useState('');

  const addRecommendedName = () => {
    if (newName.trim() !== '') {
      setRecommendedNames((prevNames) => [...prevNames, newName]);
      setNewName(''); // Clear the input field after adding the name
    }
  };

  const deleteRecommendedName = (index) => {
    setRecommendedNames((prevNames) =>
      prevNames.filter((_, i) => i !== index)
    );
  };


















  const [proceedContinue , setProceedContinue]=useState(
    JSON.parse(localStorage.getItem('proceedContinue')) || false
  )
  const [showUpload,setShowUpload]=useState(false)
  return (
    <div>
      <div className="header-req">
        <div className="head1">
          <h1>REQUEST FORM</h1>
        </div>
      </div>
      <div className="head2-req">
        <Link to="/">DASHBOARD</Link> / REQUEST FORM
      </div>
      <div className="container-req">
        <div className="body">
          <div className="contents-req">
            <div className="content-req">
              <div className="inputtypes">
                <div className="items">
                  <label htmlFor="">Branch Code*</label>
                  <div>
                    <input
                      className="inputs"
                      type="text"
                      name="branchCode"
                      value={formData.branchCode}
                      onChange={(e)=>handleInputChange(e)}
                      id="branch-code"
                      placeholder="Branch Code"
                    />
                  </div>
                </div>
                <div className="items">
                  <label htmlFor="">Branch Name*</label>
                  <div>
                    <input
                      className="inputs"
                      type="number"
                      value={formData.branchName}
                      name="branchName"
                      onChange={(e)=>handleInputChange(e)}
                      id="branch-name"
                      placeholder="Branch-Name"
                    />
                  </div>
                </div>
                <div className="items">
                  <label htmlFor="">Customer Name*</label>
                  <div>
                    <input
                      className="inputs"
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={(e)=>handleInputChange(e)}
                      id="customer-name"
                      placeholder="Customer Name"
                    />
                  </div>
                </div>
                <div className="items">
                  <label htmlFor="">Customer Account Number*</label>
                  <div>
                    <input
                      className="inputs"
                      type="number"
                      value={formData.customerAccountNumber}
                      name="customerAccountNumber"
                      onChange={(e)=>handleInputChange(e)}
                      id="customer-AC"
                      placeholder="Customer Account Number"
                      onClick={(e) => handleAccountNumberClick(e.target.value)}
                    />
                  </div>
                </div>
                <div className="items">
                  <label htmlFor="">Customer Account Type*</label>
                  <div>
                    <select className="input-select"  value={formData.customerAccountType} name="customerAccountType" id=""   
              onChange={(e)=>handleInputChange(e)}>
                      <option value="">....select....</option>
                      <option value="SA">SA</option>
                      <option value="CA">CA</option>
                      <option value="SA-NRE">SA-NRE</option>
                      <option value="SA-NRO">SA-NRO</option>
                    </select>
                  </div>
                </div>
              </div>

              {selectedAccountNumber && (
                <div className="table-req">
                  <h2 className="h2-req">Previous approved compensation claim</h2>
                  <table>
                    <thead>
                      <tr>
                        <th className="th-req">Requested on</th>
                        <th className="th-req">Compensation Amount(Rs.)</th>
                        <th className="th-req">Reason For Compensation</th>
                        <th className="th-req">Approved On</th>
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

              <div className="question">
                
                {questions.map((question, index) => (
                  <React.Fragment key={index}>
                    {question.isVisible && (
                      <div className="question-container">
                        <p className='question-text'>{question.question}</p>
                        <div className="radio-options">
                        <label>
                          <input
                            type="radio"
                            value="Yes"
                            checked={question.answers===true}
                            onChange={() => handleAnswerChange(index, true)}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            checked={question.answers===false}  
                            onChange={() => handleAnswerChange(index, false)}
                          />
                          No
                        </label>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              { showUpload &&(
               <div className='uploadbox'>
               <p className='req-box-para'>Please Upload Your Compensation Request Letter*</p>
               <div className='req-box-file'>
              <div className='req-box-file1'>
              <input type="file"  />
              </div>
              <div className='req-box-btn'>
                <button className='upload-btn'  onClick={upload}>upload</button>
              </div>
            </div>
            <ul>
              <li>upload a maximum of five files</li>
              <li>Each with a maximum of 2 MB</li>
              <li>Allowed file types of doc,pdf and excel </li>
            </ul>
                     
               </div>
                
               


             ) }

                { proceedContinue &&( 
                  
                  <button className='proceed' onClick={handleProceedContinue} >Proceed To Continue</button>
                ) }

            </div>
          </div>
        </div>
      
      </div>



      {showTodo && (
        
            <div className='todo'>
            <form >
              <div className='containertodo'>
                <div className='firstone'>
                  <label htmlFor="">Date of complaint (DD/MM/YYYY) *</label>
                  <input type="date" />
                  <label htmlFor="">Date of Identification of Incident (DD/MM/YYYY) *</label>
                  <input type="date" />
                  <label htmlFor="">Brief Description of the Incident</label>
                  <textarea name="" id="" cols="20" rows="10"></textarea>
                  <label htmlFor="">Compensation claimed (Rs.) *</label>
                  <input type="text" placeholder='Compensation claimed (Rs.)' />
                  <label htmlFor="">Recommender Name *</label> 
                  <div className='reccomend'>
                  <div>      <input  type="text"   value={newName}
          onChange={(e) => setNewName(e.target.value)} /></div>
          <div className='add'>  <BiAddToQueue  onClick={addRecommendedName}/></div>
          </div>
          <div className='listall'>
          <ul>
        {recommendedNames.map((name, index) => (
          <li key={index}>
            {name}
            <button className='delete-btn' onClick={() => deleteRecommendedName(index)}><MdDeleteOutline/></button>
          </li>
        ))}
      </ul>
          </div>
          
                </div>
                <div className='secondone'>
                <label htmlFor="">Date of occurence of Incident (DD/MM/YYYY) *</label>
                  <input type="date" />
                  <label htmlFor="">Debit GL a/c</label>
                  <input type="text" />
                  <label htmlFor="">Reason for Compensation *</label>
                  <textarea name="" id="" cols="20" rows="10"></textarea>
                  <label htmlFor="">Attachment</label>
                  <input type="file" />
              
                </div>
              </div>
              <button type='submit'>Submit</button>
            </form>
            </div>
         
            )}

     

          </div>




    
  );
}


export default Request;