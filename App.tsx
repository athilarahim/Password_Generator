import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {Formik} from 'formik'

export default function App() {

  const [password, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)

  const [lowerCase, setLowercase] = useState(true);
  const [upperCase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const PasswordSchema = Yup.object().shape({
    PasswordLength: Yup.number()
    .min(8, 'Should be min of 8 characters')
    .max(16, 'Should me max of 16 characters')
    .required('Length is required')
  })

  const GeneratePassword = (PasswordLength: number) =>{
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '@#$&*';

      let characterString = '';

      if(lowerCase){
        characterString += lowercaseChars;
      } 
      if(upperCase){
        characterString += upppercaseChars;
      }      
      if(numbers){
        characterString += numberChars;
      }       
      if(symbols){
        characterString += symbolChars;
      } 

      const finalPassword = CreatePassword(characterString,PasswordLength)
      setPassword(finalPassword)
      setIsPasswordGenerated(true)
  }

  const CreatePassword = (characters: string, PasswordLength: number) =>{
      let result = ''
      for (let i = 0; i < PasswordLength; i++) {
        const characterIndex = Math.round(Math.random() * characters.length)
        result += characters.charAt(characterIndex)
      }
      return result
  }

  const ResetPassword = () =>{
      setPassword('')
      setIsPasswordGenerated(false)
      setLowercase(true)
      setUppercase(false)
      setNumbers(false)
      setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ PasswordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={ values => {
        GeneratePassword(+values.PasswordLength)
        console.log(values);
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,

       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.PasswordLength && errors.PasswordLength && (
              <Text style={styles.errorText}>
                {errors.PasswordLength}
              </Text>
            )}
            
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.PasswordLength}
            onChangeText={handleChange('PasswordLength')}
            placeholder="Ex. 8"
            keyboardType='numeric'
            />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox
          isChecked={lowerCase}
          onPress={() => setLowercase(!lowerCase)}
          fillColor="#29AB87"
          />
         </View>
         <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    
                    isChecked={upperCase}
                    onPress={() => setUppercase(!upperCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#29AB87"
                  />
                </View>
         <View style={styles.formActions}>
          <TouchableHighlight
          onPress={() => {
            handleSubmit();
          }}
          disabled={!isValid}
          style={styles.primaryBtn}
          
          >
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableHighlight>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={ () => {
            handleReset();
            ResetPassword()
          }}
          >
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
         </View>
         </>
       )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})