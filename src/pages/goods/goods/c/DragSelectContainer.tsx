import React, { Component } from 'react'
import './DragSelectContainer.style.less'

interface DragSelectContainerProps {
  onSelected: Function
  enable: boolean
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
  _onMouseDown = e => {
    if (!this.props.enable) return
    this.setState({
      startX: e.clientX,
      startY: e.clientY,
      isMouseDown: true
    })
  }

  _onMouseMove = e => {
    if (!this.state.isMouseDown) return

    this.setState({
      currentX: e.clientX,
      currentY: e.clientY,
      isMoving: true
    })

    this._renderSelectionArae()

    this._updateCurrentState()
  }

  _onMouseUp = () => {
    this.setState({
      isMoving: false,
      isMouseDown: false
    })
  }

  _updateCurrentState = () => {
    let isInResult = []
    let dragContainer: HTMLElement = this.refs.dragContainer
    if (dragContainer && dragContainer.children) {
      let children: HTMLCollection = dragContainer.children
      for (let i = 0; i < children.length; i++) {
        let ele = children.item(i)
        let rect = ele.getBoundingClientRect()
        let left = rect.left
        let right = left + rect.width
        let top = rect.top
        let bottom = rect.top + rect.height

        let mLeft
        let mRight
        let mTop
        let mBottom
        if (this.state.startX < this.state.currentX) {
          mLeft = this.state.startX
          mRight = this.state.currentX
        } else {
          mLeft = this.state.currentX
          mRight = this.state.startX
        }

        if (this.state.startY < this.state.currentY) {
          mTop = this.state.startY
          mBottom = this.state.currentY
        } else {
          mTop = this.state.currentY
          mBottom = this.state.startY
        }

        let isNotIn =
          mRight < left || mLeft > right || mBottom < top || mTop > bottom

        if (!isNotIn) {
          isInResult.push(i)
        }
      }
      isInResult.pop()
      this.props.onSelected(isInResult)
    } else {
      this.props.onSelected([])
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
