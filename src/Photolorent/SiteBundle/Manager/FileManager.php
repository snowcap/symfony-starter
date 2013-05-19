<?php

namespace Photolorent\SiteBundle\Manager;


use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class FileManager
{
    protected $rootPath;

    /**
     * @param string $rootPath
     */
    public function __construct($rootPath)
    {
        $this->rootPath = realpath($rootPath . '/../web/');
    }

    /**
     * Get an array of SplFileInfo representing files found for the directory provided
     *
     * @param string $directory
     *  Relative path from the uploads directory
     *  This could be a pattern used by the Finder like mariages/*
     *
     * @return array
     *  Array of SplFileInfo
     */
    public function getFiles($directory) {
        $finder = new Finder();

        $finder->in($this->rootPath . '/' . ltrim($directory, '/'))->sortByName();
        $finder->files()->name('*.jpg');

        $files = array();
        /** @var $file SplFileInfo */
        foreach($finder as $file) {
            $files[] = $file;
        }

        return $files;

    }

    /**
     * @param SplFileInfo $file
     *
     * @return string
     *  The image binary content
     */
    public function getFileContent(SplFileInfo $file)
    {
        return $file->getContents();
    }




}