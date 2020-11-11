// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
  alerts: { id: number, text: React.Node, type: string }[] = [];
  nextId = 0;

  render() {
    return (
      <>
        {this.alerts.map((alert, i) => (
          <div key={alert.id} className={'alert alert-' + alert.type} role="alert">
            {alert.text}
            <button type="button" className="close" onClick={() => this.alerts.splice(i, 1)}>
              &times;
            </button>
          </div>
        ))}
      </>
    );
  }

  /**
   * Show success alert.
   */
  static success(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      const instance = Alert.instance(); // Get rendered Alert component instance
      instance?.alerts.push({ id: instance.nextId++, text: text, type: 'success' });
    });
  }

  /**
   * Show info alert.
   */
  static info(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      const instance = Alert.instance(); // Get rendered Alert component instance
      instance?.alerts.push({ id: instance.nextId++, text: text, type: 'info' });
    });
  }

  /**
   * Show warning alert.
   */
  static warning(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      const instance = Alert.instance(); // Get rendered Alert component instance
      instance?.alerts.push({ id: instance.nextId++, text: text, type: 'warning' });
    });
  }

  /**
   * Show danger alert.
   */
  static danger(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      const instance = Alert.instance(); // Get rendered Alert component instance
      instance?.alerts.push({ id: instance.nextId++, text: text, type: 'danger' });
    });
  }
}

/**
 * Renders an information card using Bootstrap classes.
 */
export class Card extends Component<{ title?: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export class CenterCard extends Component<{ title?: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10vh', marginBottom: '1vh' }}>
          <h3 className="card-title">{this.props.title}</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1vh', marginBottom: '10vh' }}>
          <div className="card-text">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

//Custom cards for PlayQuiz component.
export class AnswerCard extends Component<{
  title?: string,
  children?: React.Node,
  answ0?: string,
  answ1?: string,
  answ2?: string,
  answ3?: string,
  numCorrect?: number,
  show?:boolean,
}>{
  selectStyle = { }
  stil() {
  this.selectStyle = { border: "3px solid black" }
  }

  render() {
    return (
      <center>
        <div className="card" style={{ width: '26rem' }}>
          <div className="card-body" align="center">
            <h5 className="card-title">{this.props.title}</h5>
            <hr />
            <div className="card-text">
              {this.props.children}
              <div style={this.selectStyle} onClick={this.stil}><Button.Answer show={this.props.show} correct={1}>{this.props.answ0}</Button.Answer></div>
              &nbsp;&nbsp;&nbsp;
              <div style={this.selectStyle} onClick={this.stil}><Button.Answer show={this.props.show} correct={0}>{this.props.answ1}</Button.Answer></div>
              &nbsp;&nbsp;&nbsp;
              <div style={this.selectStyle} onClick={this.stil}><Button.Answer show={this.props.show} correct={0}>{this.props.answ2}</Button.Answer></div>
              &nbsp;&nbsp;&nbsp;
              <div style={this.selectStyle} onClick={this.stil}><Button.Answer show={this.props.show} correct={1}>{this.props.answ3}</Button.Answer></div>
            </div>
          </div>
        </div>
      </center>
    );
  }
}
/**
 * Renders a card with a smaller width than normal
 * TODO: Add variable width
 */
export class TileCard extends Component<{ title?: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card" style={{ width: '12rem' }}>
        <div className="card-body" align="center">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export class QuestionCard extends Component<{ title?: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card" style={{ width: '50rem' }}>
        <div className="card-body" align="center">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}



/**
 * Renders a row using Bootstrap classes.
 */
export class Row extends Component<{ children?: React.Node }> {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes.
 */
export class Column extends Component<{ width?: number, right?: boolean, children?: React.Node }> {
  render() {
    return (
      <div
        className={
          'col' +
          (this.props.width ? '-' + this.props.width : '') +
          (this.props.right ? ' text-right' : '')
        }
      >
        {this.props.children}
      </div>
    );
  }
}



/**
 * Renders a success button using Bootstrap styles.
 */
class ButtonSuccess extends Component<{
  width?: number,
  onClick?: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button type="button"
        className={'btn btn-success' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a green outline-block-button using Bootstrap styles.
 */
class ButtonSave extends Component<{
  width?: number,
  onClick?: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (

      <button 
      type="button" class="btn btn-outline-success btn-large btn-block"
      onClick={this.props.onClick}>
       {this.props.children} </button>
     
    );
  }
}

/**
 * Renders a green outline-block-button using Bootstrap styles.
 */
class ButtonBack extends Component<{
  width?: number,
  onClick?: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (

      <button 
      type="button" class="btn btn-outline-danger btn-large btn-block"
      onClick={this.props.onClick}>
       {this.props.children} </button>
     
    );
  }
}


/**
 * Renders a blue block-button using Bootstrap styles.
 */

class ButtonAnswer extends Component<{
  width?: number,
  onClick?:() => Mixed,
  small?:Boolean,
  children?:React.Node,
  correct?:Boolean,
  show?:boolean,
}> {
render() {
  let value = this.props.correct ? "success" : "danger"
  let ButtonClass = this.props.show ? "btn btn-" + value + " btn-lg btn-block" : "btn btn-outline-primary btn-lg btn-block"
    return (
      <button type="button" class={ButtonClass}>{this.props.children}</button>
    );
  }
}

/**
 * Renders a success block-button using Bootstrap styles.
 */

class ButtonStart extends Component<{
  width?: number,
  onClick?: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
    
    <div style={ { width: '100vh', marginLeft: '25%', marginRight: '25%', flex: '1', flexDirection: 'column'} }>
    <button 
    type="button" class="btn btn-success btn-lg btn-block"
    onClick={this.props.onClick}>
     {this.props.children} </button>
    </div>
    );
  }
}

/**
 * Renders a danger button using Bootstrap styles.
 */

 class ButtonDanger extends Component<{
  width?: number,
  onClick?: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button
        type="button"
        className={'btn btn-danger' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a light button using Bootstrap styles.
 */
class ButtonLight extends Component<{
  onClick?: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button
        type="button"
        className={'btn btn-light' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders an Outline Primary button using Bootstrap styles.
 * This button is white with a blue outline.
 * It gets filled blue when hovered.
 */
class ButtonOutlinePrimary extends Component<{
  onClick?: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button
        type="button"
        className={'btn btn-outline-primary' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a Primary button using Bootstrap styles.
 * This button is blue.
 */
class ButtonPrimary extends Component<{
  onClick?: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button
        type="button"
        className={'btn btn-primary' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a button using Bootstrap styles.
 */
export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
  static OutlinePrimary = ButtonOutlinePrimary;
  static Primary = ButtonPrimary;
  static Answer = ButtonAnswer;
  static Start = ButtonStart;
  static Save = ButtonSave;
  static Back = ButtonBack;
}

/**
 * Renders a NavBar link using Bootstrap styles.
 */
class NavBarLink extends Component<{ to: string, children?: React.Node }> {
  render() {
    return (
      <NavLink className="nav-link" activeClassName="active" to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}

/**
 * Renders a NavBar using Bootstrap classes.
 */
export class NavBar extends Component<{ brand?: React.Node, children?: React.Node }> {
  static Link = NavBarLink;

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        {
          <NavLink className="navbar-brand" activeClassName="active" exact to="/">
            {this.props.brand}
          </NavLink>
        }
        <ul className="navbar-nav">{this.props.children}</ul>
      </nav>
    );
  }
}

/**
 * Renders a form label using Bootstrap styles.
 */
class FormLabel extends Component<{ children?: React.Node }> {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

/**
 * Renders a form input using Bootstrap styles.
 */
 class FormInput extends Component<{
  type?: string,
  value?: React.Node,
  onChange?: (SyntheticEvent<HTMLInputElement>) => mixed,
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { type, value, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-control"
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

/**
 * Renders a form textarea using Bootstrap styles.
 */
class FormTextarea extends React.Component<{
  value: React.Node,
  onChange: (SyntheticEvent<HTMLTextAreaElement>) => mixed,
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, rows, cols
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, ...rest } = this.props;
    return <textarea {...rest} className="form-control" value={value} onChange={onChange} />;
  }
}

/**
 * Renders a form checkbox using Bootstrap styles.
 */
class FormCheckbox extends Component<{
  checked?: React.Node,
  onChange?: (SyntheticEvent<HTMLInputElement>) => mixed,
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { checked, onChange, ...rest } = this.props;
    return <input {...rest} type="checkbox" checked={checked} onChange={onChange} />;
  }
}

/**
 * Renders a form select using Bootstrap styles.
 */
class FormSelect extends Component<{
  value: React.Node,
  onChange: (SyntheticEvent<HTMLSelectElement>) => mixed,
  children?: React.Node,
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, size.
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, children, ...rest } = this.props;
    return (
      <select {...rest} className="custom-select" value={value} onChange={onChange}>
        {children}
      </select>
    );
  }
}

/**
 * Renders form components using Bootstrap styles.
 */
export class Form {
  static Label = FormLabel;
  static Input = FormInput;
  static Textarea = FormTextarea;
  static Checkbox = FormCheckbox;
  static Select = FormSelect;
}
