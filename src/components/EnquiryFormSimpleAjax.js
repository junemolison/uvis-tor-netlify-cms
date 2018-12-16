import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import { SPAM_DETECTOR } from '../util/spamDetector'

import './EnquiryForm.css'

const fetch = window.fetch

class Form extends React.Component {
  static defaultProps = {
    name: 'Simple Form Ajax',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Спасибо за запрос, мы скоро ответим Вам',
    errorMessage: 'Возникла проблема, Ваше сообщение не доставлено, пожалуйста, свяжитесь с нами по почте',
    spamMessage: 'Ваше сообщение было помечено как спам'
  }

  state = {
    alert: '',
    disabled: false
  }

  validate = text => !SPAM_DETECTOR.test(text)

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    if (!this.validate(form.message.value)) {
      form.reset()
      this.setState({
        alert: this.props.spamMessage,
        disabled: false
      })
      return
    }
    const data = stringify(serialize(form))
    this.setState({ disabled: true })
    fetch(form.action + '?' + data, {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render () {
    const { name, subject, action } = this.props

    return (
      <form
        className='EnquiryForm'
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=''
        data-netlify-honeypot='_gotcha'
      >
        {this.state.alert && (
          <div className='EnquiryForm--Alert'>{this.state.alert}</div>
        )}
        <label className='EnquiryForm--Label'>
          <input
            aria-label='Имя'
            className='EnquiryForm--Input'
            type='text'
            placeholder='Имя'
            name='name'
            required
          />
        </label>
        <label className='EnquiryForm--Label'>
          <input
            aria-label='Электронная почта'
            className='EnquiryForm--Input'
            type='email'
            placeholder='Электронная почта'
            name='email'
            required
          />
        </label>
        <label className='EnquiryForm--Label'>
          <textarea
            aria-label='Сообщение'
            className='EnquiryForm--Input EnquiryForm--Textarea'
            placeholder='Сообщение'
            name='message'
            rows='10'
            required
          />
        </label>
        <input type='text' name='_gotcha' style={{ display: 'none' }} />
        {!!subject && <input type='hidden' name='subject' value={subject} />}
        <input type='hidden' name='form-name' value={name} />
        <input
          aria-label='Оставить заявку'
          className='Button EnquiryForm--SubmitButton'
          type='submit'
          value='Оставить заявку'
          disabled={this.state.disabled}
        />
      </form>
    )
  }
}

export default Form
