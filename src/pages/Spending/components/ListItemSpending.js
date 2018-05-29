import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Avatar from '../../../components/Avatar'
import Card, { CardContent } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import DateDisplay from '../../../components/datetime/DateDisplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
}
@inject('spendingStore', 'travelStore', 'routingStore')
@observer
class ListItemSpending extends Component {
  render () {
    const { spending, spendingStore, routingStore, travelStore, index } = this.props
    return (
      <Card style={styles.card}>
        <CardContent>
          <div>
            <DateDisplay date={spending && spending.date !== undefined && moment(spending.date)} />
          </div>
          <div>
            <Avatar src={spending && spending.creator && spending.creator.avatar && spending.creator.avatar} />
          </div>
          <div>
            {spending !== undefined && spending.amount}
          </div>
          <div>
            <div>
              {spending !== undefined && spending.name}
            </div>
            <div>
              {spending !== undefined && spending.recipients && spending.recipients.map((item) => {
                return <Avatar key={item.id} src={item.avatar} />
              })}
            </div>
          </div>
          <div>
            <FontAwesomeIcon onClick={() => {
              spendingStore.setSpendingCreation(spending)
              spendingStore.setCurrentSpendingId(index)
              routingStore.history.push(`/travels/${travelStore.currentTravelId}/editSpending/${index}`)
            }} icon={['fal', 'pen']} />
          </div>
        </CardContent>
      </Card>)
  }
}
export default withStyles(styles)(ListItemSpending)
