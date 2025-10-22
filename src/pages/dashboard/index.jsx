import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withStyles } from '@mui/styles';
import { Grid, Container, Button, TextField } from '@mui/material';
import {
  Add as AddIcon
} from '@mui/icons-material';

import { Header, Section, CharacterBox, AddBox,
  CreateCharacterModal, ConfirmationModal, EditableRow,
  AttributeModal, SkillModal
} from '../../components';

import { api } from '../../utils';
import useModal from '../../hooks/useModal';

import { PrismaClient } from '@prisma/client';

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  
  function parseConfigs(array) {
    return array.map(config => {
      if(config.name === 'DICE_ON_SCREEN_TIMEOUT_IN_MS' || config.name === 'TIME_BETWEEN_DICES_IN_MS') {
        return {
          ...config,
          value: parseInt(config.value) / 1000
        }
      }

      return config;
    });
  }

  try {
    const characters = await prisma.character.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });

    const attributes = await prisma.attribute.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });

    const skills = await prisma.skill.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });

    const configs = await prisma.config.findMany();

    const serializedCharacters = JSON.parse(JSON.stringify(characters));
    const serializedAttributes = JSON.parse(JSON.stringify(attributes));
    const serializedSkills = JSON.parse(JSON.stringify(skills));
    const serializedConfigs = JSON.parse(JSON.stringify(parseConfigs(configs)));

    return {
      props: {
        characters: serializedCharacters,
        attributes: serializedAttributes,
        skills: serializedSkills,
        configs: serializedConfigs
      },
    };
  } catch (error) {
    console.error('Database error in dashboard:', error);
    
    // Retornar dados vazios em caso de erro
    return {
      props: {
        characters: [],
        attributes: [],
        skills: [],
        configs: [],
        error: 'Failed to load data from database'
      }
    };
  } finally {
    await prisma.$disconnect();
  }
}
