import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import Backend from 'utils/service'
import { Col, Modal, Row } from 'react-bootstrap'
import type { SchemaMovie } from 'client'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

const Index: React.FC = () => {
  return (
    <PageContainer>
      <div style={{ display: 'flex' }}>
        User management in progress!
      </div>
    </PageContainer>
  );
}

export default Index
