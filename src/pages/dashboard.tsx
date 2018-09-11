import React from 'react'
import MainDashboardLayouts from '../layouts/MainDashboardLayouts/index'
import CategoryContent from '../components/Category/category'

export default class extends React.Component {
  render() {
    return (
      <div>
        <MainDashboardLayouts>
          <CategoryContent />
        </MainDashboardLayouts>
      </div>
    )
  }
}