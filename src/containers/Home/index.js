import React, { useState, useEffect } from 'react'
import { Button, Card, Tab, Tabs, Dropdown, Form, Row, Col, Carousel, Modal,Toast,ToastContainer } from 'react-bootstrap'
import { FaRegHeart, FaRegArrowAltCircleRight, FaRegUser, FaRegEnvelope, FaRegClipboard } from "react-icons/fa";
import { ref, set, update, onValue } from "firebase/database";
import { BsArrowDownUp, BsTelephone } from "react-icons/bs";
import { copyToClipboard } from '../../utils/copyToClipboard';
import * as yup from 'yup';
import { ethers } from 'ethers';
import { userId, db } from '../../Firebase/config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import QRCode from "react-qr-code";
import { Formik } from 'formik';

// styles 
import './styles.scss'

// assets
import Bitcoin from '../../assets/bitcoin.svg'
import Ethereum from '../../assets/ethereum-eth.svg'
import teamWork from '../../assets/teamwork.svg'
import hearts from '../../assets/hearts.svg'
import taxReceipt from '../../assets/tax-icon.png'
import qrCodeLine from '../../assets/qr-code-line.svg'
import slide1 from '../../assets/images/background.jpg'
import slide2 from '../../assets/images/bg-2.jpg'
import slide3 from '../../assets/images/bg-3.jpg'

const Home = () => {

    const [swapCurrency, setSwapCurrency] = useState(false);
    const [activeTab, setActiveTab] = useState();
    const [disableInputs, setDisableInputs] = useState(false);
    const [currencyPrice, setCurrencyPrice] = useState(null);
    const [thanksModal, setThanksModal] = useState(false);
    const [treasuryAddress, setTreasuryAddress] = useState('');
    const [btcTreasuryAddress, setBtcTreasuryAddress] = useState('');
    const [modalShow, setModalShow] = React.useState(false);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;

    const confirmationModal = () => {
        return (
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Did you send ETH to this wallet?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Your confirmation lets us know whether or not to expect funds at this address. If yes, then the wallet will remain active for 24 hours or until your donation is received.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalShow(false)} variant="secondary">No</Button>
                    <Button onClick={() => { setModalShow(false); setModalShow(false) }} variant="primary">Yes</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const DonationModal = () => (
        <Modal
            size="sm"
            show={thanksModal}
            onHide={() => setThanksModal(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Family Donation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Thank you for your donation!
            </Modal.Body>
        </Modal>
    )

    const renderToast = () => {
        <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-dark position-relative"
        style={{ minHeight: '240px' }}
      >
        <ToastContainer className="p-3" position={position}>
          <Toast>
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    }

    const initialValues = {
        selectCrypto: 'BTC',
        donationAmount: '',
        firstName: '',
        lastName: '',
        email: '',
        telephone: ''
    }

    const schema = yup.object().shape({
        selectCrypto: yup.string().required(),
        donationAmount: yup.number().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email(),
        telephone: yup.number().required()
    });
    const saveDonation = (e,data, donationAmount) => {
        var amount;
        e.preventDefault();
        const getTotalDonation = ref(db, 'TotalDonation');
        onValue(getTotalDonation, (snapshot) => {
            amount = snapshot.val();
         
            console.log(amount)
            console.log(Number(amount) + Number(donationAmount))
        })
        set(ref(db, 'donaters/' + userId), data);
        debugger
        set(ref(db, 'TotalDonation/'),  (Number(amount) + Number(donationAmount)));

        
        // var TotalDonation = db.ref('');
        // set(ref(db, 'donaters/TotalDonation'), {TotalDonation: Number(donationAmount)});
        // ref(db,'donaters/TotalDonation')
        // TotalDonation.set({TotalDonation: 1})
    }

    return (
        <>
            <Header />
            <div className="container-fluid section-bg">
                {/* BAckground Slider */}
                <Carousel className="background-carousel" fade controls={false} indicators={false}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={slide1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={slide2}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={slide3}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>

                <div className="container content-body">
                    <div className="row h-100">
                        <div className="col-md-6 cover-content d-flex flex-column justify-content-center align-items-start">
                            <div className="welcome-text mb-auto"><FaRegHeart className="SvgIcon" /> Welcome to the Donation</div>
                            <h3>Donate crypto to save the</h3>
                            <h1>CHILDREN</h1>
                            <p>Cryptocurrency fixes this.<br />
                                Donate to provide clean water today</p>
                            <Button variant="success" className="main-btn mb-auto"><FaRegArrowAltCircleRight className="SvgIcon noColor" />Learn More</Button>
                        </div>
                        <div className="col-md-6 stepper-card-wrapper">
                            <Card className="stepper-card">
                                <Card.Body className="form-card">
                                    <Formik
                                        validationSchema={schema}
                                        initialValues={initialValues}
                                        // validateOnChange={true}
                                        initialErrors={schema.isValidSync(initialValues)}
                                        validateOnBlur={true}
                                        validateOnMount={true}
                                        validate={(values) => {
                                            let errors = {};
                                            if (!values.firstName) {
                                                errors.firstName = 'First name is required';
                                            }
                                            if (!values.lastName) {
                                                errors.lastName = 'Last name is required';
                                            }
                                            if (!values.email) {
                                                errors.email = 'Email is required';
                                            }
                                            if (!values.telephone) {
                                                errors.telephone = 'Phone Number is required';
                                            }

                                            return errors;
                                        }}
                                    >
                                        {({
                                            setFieldValue,
                                            handleBlur,
                                            values,
                                            errors,
                                            touched,
                                            setErrors,
                                            validateForm
                                        }) => {
                                            // console.log('errors: ', errors, 'values: ', values)
                                            const payloadUserInformation = {
                                                currency: values.selectCrypto,
                                                donatedAmount: values.donationAmount,
                                                email: values.email,
                                                firstName: values.firstName,
                                                lastName: values.lastName,
                                                telephone: values.telephone
                                            }
                                            const payloadAnonymous = {
                                                currency: values.selectCrypto,
                                                donatedAmount: values.donationAmount
                                            }

                                            const resetErrors = () => {
                                                setTimeout(() => setErrors({}), 500);
                                            };
                                            
                                            const donateAnonymously = () => {
                                                setFieldValue('firstName', '');
                                                setFieldValue('lastName', '');
                                                setFieldValue('telephone', '');
                                                setFieldValue('email', '');
                                                setDisableInputs(!disableInputs);
                                            }

                                            const connectMetamask = async () => {
                                                console.log(Number(values.donationAmount * 1e18).toString(16));
                                                try {
                                                    if (!ethereum) {
                                                        alert('please install metamask');
                                                        return;
                                                    }
                                                    const accounts = await ethereum.request({
                                                        method: 'eth_requestAccounts',
                                                    });
                                                    let balance = await provider.getBalance(accounts[0]);
                                                    let bal = ethers.utils.formatEther(balance);
                                                    // console.log(balance)
                                                    // console.log('ether balance', bal);
                                                    const transactionParameters = {
                                                        to: treasuryAddress,
                                                        from: ethereum.selectedAddress,
                                                        value: Number(values.donationAmount * 1e18).toString(16),
                                                        chainId: '0x4'
                                                    };

                                                 await ethereum.request({
                                                        method: 'wallet_switchEthereumChain',
                                                        params: [{
                                                            "chainId": "0x4"
                                                        }],
                                                    }).then(async (result) => {

                                                        await ethereum.request({
                                                            method: 'eth_sendTransaction',
                                                            params: [transactionParameters],
                                                        }).then((result) => {
                                                            console.log('success: ', result);
                                                            setThanksModal(true);
                                                        }).catch((error) => {
                                                                alert('User denied transaction signature.');
                                                                console.log('if transaction fail', error)
                                                            });
                                                       
                                                    });


                                               
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            };

                                            const onStartOver = () => {
                                                setActiveTab('cryptocurrency');
                                                setModalShow(true);
                                            }

                                            const getCurrencyPrice = () => {
                                                fetch(`https://min-api.cryptocompare.com/data/price?fsym=${values.selectCrypto}&tsyms=USD`)
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        setCurrencyPrice(data.USD);
                                                    })
                                                    .catch(err => console.error(err));
                                            }

                                            const getTreasury = () => {
                                                const treasuryAddress = ref(db, 'Treasury');
                                                onValue(treasuryAddress, (snapshot) => {
                                                    const data = snapshot.val();
                                                    setTreasuryAddress(data);
                                                });

                                            }
                                            const getBTCTreasury = () => {
                                                const btcTreasuryAddress = ref(db, 'TreasuryBitcoin');
                                                onValue(btcTreasuryAddress, (snapshot) => {
                                                    const data = snapshot.val();
                                                    setBtcTreasuryAddress(data);
                                                });

                                            }
                                            const copyData = () => {
                                                copyToClipboard(treasuryAddress);
                                            }
                                            useEffect(() => {
                                                getCurrencyPrice();
                                            }, [values.selectCrypto])

                                            useEffect(() => {
                                                getTreasury();
                                                getBTCTreasury();
                                            }, [])

                                            useEffect(() => {
                                                validateForm();
                                            }, []);
                                            
                                            useEffect(() => {
                                                if (disableInputs) {
                                                    resetErrors();
                                                }
                                            }, [disableInputs])

                                            return (
                                                <Tabs
                                                    defaultActiveKey="cryptocurrency"
                                                    id="justify-tab-example"
                                                    className="mb-3"
                                                    justify
                                                    activeKey={activeTab}
                                                >
                                                    {/* Cryptocurrency Step */}
                                                    <Tab eventKey="cryptocurrency" title={<div><b>Step 1</b><br />Cryptocurrency</div>}>
                                                        <Card bg={'light'} text={'dark'}>
                                                            <Card.Body>
                                                                <div className="crypto-dropdown">
                                                                    <label>Select Your Crypto</label>
                                                                    <Dropdown onSelect={(e) => setFieldValue('selectCrypto', e)}>
                                                                        <Dropdown.Toggle id="crypto-dropdown">
                                                                            <img src={values.selectCrypto.includes('BTC') ? Bitcoin : Ethereum} alt={'coin'} /> {values.selectCrypto === "BTC" ? 'BTC (Bitcoin)' : 'ETH (Ethereum)'}
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item eventKey="BTC"><img src={Bitcoin} alt={'coin'} /> BTC (Bitcoin)</Dropdown.Item>
                                                                            <Dropdown.Item eventKey="ETH"><img src={Ethereum} alt={'coin'} /> ETH (Ethereum)</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                                <div className="eth-converter-wrapper">
                                                                    <label>Enter Donation Amount</label>
                                                                    <div className="eth-converter">
                                                                        <div className="converter-field">
                                                                            <input required type="number" placeholder='0.25' value={values.donationAmount} onChange={(e) => setFieldValue('donationAmount', e.target.value)} />
                                                                            <span>~$ {(currencyPrice * values.donationAmount).toFixed(2)}</span>
                                                                        </div>
                                                                        <div className="converter-btn">
                                                                            <span>{swapCurrency ? values.selectCrypto : 'USD'}</span>
                                                                            <button onClick={() => setSwapCurrency(!swapCurrency)} type="button"><BsArrowDownUp /></button>
                                                                            <span>{swapCurrency ? 'USD' : values.selectCrypto}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Button className="fd-form-btn" disabled={!values.donationAmount || values.donationAmount <= 0} onClick={() => setActiveTab('information')}>Continue</Button>
                                                            </Card.Body>
                                                        </Card>
                                                    </Tab>

                                                    {/* Information Step */}

                                                    <Tab eventKey="information" title={<div><b>Step 2</b><br />Information</div>}>
                                                        <Card bg={'light'} text={'dark'}>
                                                            <Card.Body className="form-card">
                                                                <Form noValidate onSubmit={(e) => saveDonation(e, disableInputs ? payloadAnonymous : payloadUserInformation, values.donationAmount)}>
                                                                    <div className="fd-custom-checkbox">
                                                                        <Form.Check type={'checkbox'} id={`check-api-checkbox`}>
                                                                            <Form.Check.Input type={'checkbox'} onChange={() => donateAnonymously()} />
                                                                            <Form.Check.Label>Donate Anonymously</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </div>

                                                                    <Form.Group className="fd-form-field" controlId="firstName">
                                                                        <Form.Control onBlur={handleBlur} isInvalid={errors.firstName && touched.firstName} type="text" value={values.firstName} onChange={(e) => setFieldValue('firstName', e.target.value)} disabled={disableInputs} placeholder="First Name" />
                                                                        <div className="input-icon"><FaRegUser /></div>
                                                                        <Form.Control.Feedback type="invalid">
                                                                            {errors.firstName}
                                                                        </Form.Control.Feedback>
                                                                    </Form.Group>
                                                                    <Form.Group className="fd-form-field" controlId="lastName">
                                                                        <Form.Control onBlur={handleBlur} isInvalid={errors.lastName && touched.lastName} type="text" value={values.lastName} onChange={(e) => setFieldValue('lastName', e.target.value)} disabled={disableInputs} placeholder="Last Name" />
                                                                        <div className="input-icon"><FaRegUser /></div>
                                                                        <Form.Control.Feedback type="invalid">
                                                                            {errors.lastName}
                                                                        </Form.Control.Feedback>
                                                                    </Form.Group>
                                                                    <Form.Group className="fd-form-field" controlId="email">
                                                                        <Form.Control onBlur={handleBlur} isInvalid={errors.email && touched.email} type="email" value={values.email} onChange={(e) => setFieldValue('email', e.target.value)} disabled={disableInputs} placeholder="Email Address" />
                                                                        <div className="input-icon"><FaRegEnvelope /></div>
                                                                        <Form.Control.Feedback type="invalid">
                                                                            {errors.email}
                                                                        </Form.Control.Feedback>
                                                                    </Form.Group>
                                                                    <Form.Group className="fd-form-field" controlId="telephone">
                                                                        <Form.Control onBlur={handleBlur} isInvalid={errors.telephone && touched.telephone} type="tel" value={values.telephone} onChange={(e) => setFieldValue('telephone', e.target.value)} disabled={disableInputs} placeholder="+1 321 4845667" />
                                                                        <div className="input-icon"><BsTelephone /></div>
                                                                        <Form.Control.Feedback type="invalid">
                                                                            {errors.telephone}
                                                                        </Form.Control.Feedback>
                                                                    </Form.Group>
                                                                    <Row style={{ marginTop: "20px" }}>
                                                                        <Col className="pe-2"><Button className="fd-form-btn fd-form-secondary" onClick={() => setActiveTab('cryptocurrency')} eventKey="information">Previous</Button></Col>
                                                                        <Col className="ps-2"><Button type="submit" className="fd-form-btn" disabled={disableInputs === false ? (!values.firstName || !values.lastName || !values.telephone || !values.email || !values.donationAmount || (errors.donationAmount || errors.email || errors.firstName | errors.telephone)) ? true : false : false} onClick={() => setActiveTab('cryptoWallet')}>Continue</Button></Col>
                                                                    </Row>
                                                                </Form>
                                                            </Card.Body>
                                                        </Card>
                                                    </Tab>

                                                    {/* Crypto Wallet Step */}

                                                    <Tab eventKey="cryptoWallet" title={<div><b>Step 3</b><br />Crypto Wallet</div>}>
                                                        <Card bg={'light'} text={'dark'}>
                                                            <Card.Body className="form-card">
                                                                <div className="tax-receipt d-none">
                                                                    <img src={taxReceipt} alt="tax" />
                                                                    <h5>Want a tax receipt?</h5>
                                                                    <p>If you would like to receive a tax receipt while remaining anonymous, enter your email below. This email will only be used for the purpose of issuing your tax receipt.</p>
                                                                    <Form.Group className="fd-form-field" controlId="lastName">
                                                                        <Form.Control type="email" placeholder="Email Address" />
                                                                        <div className="input-icon"><FaRegEnvelope /></div>
                                                                    </Form.Group>
                                                                    <Row style={{ marginTop: "20px" }}>
                                                                        <Col className="pe-2"><Button className="fd-form-btn fd-form-secondary" onClick={() => setActiveTab('information')} eventKey="information">Previous</Button></Col>
                                                                        <Col className="ps-2"><Button className="fd-form-btn">Get Receipt</Button></Col>
                                                                    </Row>
                                                                </div>
                                                                <div className="wallet-address">
                                                                    <h5>Use the address below to donate {values.donationAmount} {values.selectCrypto} from your wallet.</h5>
                                                                    <div className="address-bar">
                                                                        <span>{values.selectCrypto === "ETH" ? treasuryAddress: btcTreasuryAddress}</span>
                                                                        <button type="button" onClick={() => copyData()}>
                                                                            <FaRegClipboard />
                                                                        </button>
                                                                    </div>
                                                                    <div className="qr-code-wrapper">
                                                                        <img src={qrCodeLine} className="bg-line" alt="qr bg" />
                                                                        <div className="qr-code text-center">
                                                                            <QRCode size={73} value={treasuryAddress || ''} />
                                                                        </div>
                                                                    </div>
                                                                    <Button className="fd-form-btn fd-form-secondary" disabled={values.selectCrypto==='BTC'} onClick={() => connectMetamask()}>Transact with Metamask</Button>
                                                                    <p>Please note that your donation will clear even if you donate a different amount than you pledged.</p>
                                                                    <Row style={{ marginTop: "20px" }}>
                                                                        <Col className="pe-2"><Button onClick={() => setActiveTab('information')} className="fd-form-btn fd-form-secondary">Previous</Button></Col>
                                                                        <Col className="ps-2"><Button onClick={() => onStartOver()} className="fd-form-btn">Start Over</Button></Col>
                                                                    </Row>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Tab>
                                                </Tabs>
                                            )
                                        }}
                                    </Formik>
                                </Card.Body>
                            </Card>
                            <Card className="mt-3 stepper-card total-amount" bg={'success'}>
                                <Card.Body>
                                    <img src={teamWork} alt="teamwork" />
                                    <div className="amount">
                                        <h4>$1000</h4>
                                        EHT & BTC Raised by People
                                    </div>
                                    <img src={hearts} alt="hearts" />
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            {confirmationModal()}
            <DonationModal />
        </>
    )
}

export default Home
