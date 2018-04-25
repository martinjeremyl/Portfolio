import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Avatar from './Avatar'
import Card, { CardContent } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import DateDisplay from './DateDisplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
}
@inject('appStore', 'userStore')
@observer
class ListItemSpending extends Component {
  render () {
    const spending = this.props.spending
    return (
      <Card style={styles.card}>
        <CardContent>
          <div>
            <DateDisplay date={spending.date} />
          </div>
          <div>
            <Avatar src={spending.creator.avatar} />
          </div>
          <div>
            {spending.amount}
          </div>
          <div>
            <div>
              {spending.label}
            </div>
            <div>
              {spending.participants && spending.recipients.map((item) => {
                return <Avatar key={item.id} src={item.avatar} />
              })}
            </div>
          </div>
          <div>
            <FontAwesomeIcon icon={['fal', 'pen']} />
          </div>
        </CardContent>
      </Card>)
  }
}
export default withStyles(styles)(ListItemSpending)
