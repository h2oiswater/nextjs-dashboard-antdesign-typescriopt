import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './DragSelectContainer.style.less'

interface DragSelectContainerProps {
  onSelected: Function
}

export default class DragSelectContainer extends Component<
  DragSelectContainerProps,
  any
> {
  state = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isMoving: false,
    isMouseDown: false
  }
  _onMouseDown = (e: MouseEvent) => {
    this.setState({
      startX: e.clientX,
      startY: e.clientY,
      isMouseDown: true
    })
  }

  _onMouseMove = e => {
    console.log(e)
    if (!this.state.isMouseDown) return

    this.setState({
      currentX: e.clientX,
      currentY: e.clientY,
      isMoving: true
    })

    this._renderSelectionArae()

    this._updateCurrentState()
  }

  _onMouseUp = e => {
    this.setState({
      isMoving: false,
      isMouseDown: false
    })
  }

  _updateCurrentState = () => {
    let dragContainer: HTMLElement = this.refs.dragContainer
    if (dragContainer && dragContainer.children) {
      let children: HTMLCollection = dragContainer.children
      children.item(0).getBoundingClientRect()
      children.item(1).getBoundingClientRect()
      console.log()
      console.log()
    }
  }

  _renderSelectionArae = () => {
    if (this.state.isMoving) {
      return (
        <div
          className="drag-area"
          style={{
            left:
              this.state.startX < this.state.currentX
                ? this.state.startX
                : this.state.currentX,
            top:
              this.state.startY < this.state.currentY
                ? this.state.startY
                : this.state.currentY,
            width: Math.abs(this.state.currentX - this.state.startX),
            height: Math.abs(this.state.currentY - this.state.startY)
          }}
        />
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div
        ref="dragContainer"
        className="drag-select-container"
        onMouseDown={this._onMouseDown}
        onMouseMove={this._onMouseMove}
        onMouseUp={this._onMouseUp}
        onMouseLeave={this._onMouseUp}
        // onTouchStart={this._onMouseDown}
        // onTouchMove={this._onMouseMove}
        // onTouchEnd={this._onMouseUp}
      >
        {this.props.children}
        {this._renderSelectionArae()}
      </div>
    )
  }
}
